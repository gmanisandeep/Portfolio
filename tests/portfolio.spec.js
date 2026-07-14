import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const caseRoutes = [
  '/work/dhan-enterprises',
  '/work/suprabha-trust',
  '/work/twinkle-ai',
  '/work/campus-connect',
  '/work/life-os',
  '/work/tbh-creatives',
];

test('homepage loads without console errors or broken images', async ({ page, request }) => {
  const consoleErrors = [];
  page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Digital products');
  const imageSources = await page.locator('img').evaluateAll((images) => [...new Set(images.map((image) => image.src))]);
  for (const source of imageSources) expect((await request.get(source)).ok(), source).toBeTruthy();
  expect(consoleErrors).toEqual([]);
});

test('case-study routes load and expose route-specific initial metadata', async ({ page, request }) => {
  for (const route of caseRoutes) {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    const initialHtml = await response.text();
    expect(initialHtml).toContain(`<link rel="canonical" href="https://manisandeep.qzz.io${route}"`);
    await page.goto(route);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('.case-navigation')).toBeVisible();
    await page.setViewportSize({ width: 320, height: 568 });
    const widths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(widths.scroll).toBe(widths.client);
  }
});

test('unknown routes show the designed 404 experience', async ({ page }) => {
  await page.goto('/this-route-should-not-exist');
  await expect(page.getByText('404 / Lost route')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore selected work' })).toBeVisible();
});

test('hash navigation, menu keyboard behavior and logo return work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Work', exact: true }).first().click();
  await expect(page).toHaveURL(/#work$/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeHidden();
  await page.goto(caseRoutes[0]);
  await page.getByRole('link', { name: 'MS. — Mani Sandeep, home' }).first().click();
  await expect(page).toHaveURL(/\/$/);
});

for (const viewport of [
  { width: 320, height: 568 }, { width: 360, height: 800 }, { width: 375, height: 667 },
  { width: 390, height: 844 }, { width: 393, height: 873 }, { width: 430, height: 932 },
]) {
  test(`mobile composition has no overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const widths = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(widths.scroll).toBe(widths.client);
    const first = await page.locator('.project').nth(0).boundingBox();
    const second = await page.locator('.project').nth(1).boundingBox();
    expect(second.y).toBeGreaterThan(first.y + first.height - 1);
    await expect(page.getByRole('link', { name: 'View Selected Work' })).toBeVisible();
  });
}

test('tablet, desktop, wide and mobile-landscape viewports preserve layout bounds', async ({ page }) => {
  for (const viewport of [
    { width: 844, height: 390 }, { width: 768, height: 1024 }, { width: 820, height: 1180 },
    { width: 1024, height: 768 }, { width: 1280, height: 720 }, { width: 1366, height: 768 },
    { width: 1440, height: 900 }, { width: 1536, height: 864 }, { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const bounds = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      cards: document.querySelectorAll('.project').length,
    }));
    expect(bounds.scroll, `${viewport.width}x${viewport.height}`).toBe(bounds.client);
    expect(bounds.cards).toBe(6);
  }
});

test('form validates, announces errors and blocks duplicate submissions', async ({ page }) => {
  await page.goto('/#contact');
  const form = page.locator('form[name="project-enquiry"]:not([hidden])');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.locator('#name-error')).toBeVisible();
  await expect(form.locator('input[name="name"]')).toBeFocused();

  await form.locator('input[name="name"]').fill('Portfolio QA');
  await form.locator('input[name="email"]').fill('portfolio-qa@example.com');
  await form.locator('select[name="type"]').selectOption({ label: 'Business website' });
  await form.locator('select[name="budget"]').selectOption({ label: 'Not sure yet' });
  await form.locator('textarea[name="message"]').fill('Automated regression submission that is intercepted locally.');
  let submissions = 0;
  await page.route('**/', async (route) => {
    if (route.request().method() !== 'POST') return route.continue();
    submissions += 1;
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.fulfill({ status: 200, body: 'ok' });
  });
  await form.evaluate((element) => { element.requestSubmit(); element.requestSubmit(); });
  await expect(form.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  await expect(page.getByText('Thanks—your enquiry has been sent.')).toBeVisible();
  expect(submissions).toBe(1);
});

test('reduced motion is respected and no serious accessibility issues are detected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page.locator('.button').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThan(0.001);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact))).toEqual([]);
});

test('forced-colors mode keeps core content and navigation available', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Selected Work' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MS. — Mani Sandeep, home' }).first()).toBeVisible();
});
