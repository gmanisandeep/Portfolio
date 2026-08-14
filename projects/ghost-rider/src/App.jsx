import { useEffect, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ghostRiderLogo from "./assets/ghost-rider-logo-transparent.webp";
import comicRider from "./assets/ghost-rider-comic-cutout.webp";
import poster2007 from "./assets/archive/ghost-rider-2007-official-poster-preview.webp";
import poster2012 from "./assets/archive/spirit-of-vengeance-2012-official-poster-preview.webp";
import wallpaperFlame from "./assets/archive/ghost-rider-flame-4k-preview.webp";
import wallpaperCharge from "./assets/archive/ghost-rider-charge-4k-preview.webp";
import wallpaperRoad from "./assets/archive/ghost-rider-burning-road-4k-preview.webp";

const SCREEN_HISTORY = [
  {
    year: "2007",
    format: "Feature film",
    title: "Ghost Rider",
    rider: "Johnny Blaze / Ghost Rider",
    actor: "Nicolas Cage",
    director: "Mark Steven Johnson",
    cast: "Matt Long (young Johnny Blaze), Eva Mendes, Wes Bentley, Sam Elliott, Donal Logue, Peter Fonda",
    image: poster2007,
    imageAlt: "Official theatrical poster for Ghost Rider (2007)",
    width: 1400,
    height: 2100,
    source: "https://www.sonypictures.com/movies/ghostrider",
  },
  {
    year: "2012",
    format: "Feature film",
    title: "Ghost Rider: Spirit of Vengeance",
    rider: "Johnny Blaze / Ghost Rider",
    actor: "Nicolas Cage",
    director: "Mark Neveldine & Brian Taylor",
    cast: "Idris Elba, Ciarán Hinds, Violante Placido, Johnny Whitworth, Christopher Lambert",
    image: poster2012,
    imageAlt: "Official theatrical poster for Ghost Rider: Spirit of Vengeance (2012)",
    width: 1400,
    height: 2100,
    source: "https://www.sonypictures.com/movies/ghostriderspiritofvengeance",
  },
  {
    year: "2016–17",
    format: "Television",
    title: "Marvel’s Agents of S.H.I.E.L.D.",
    rider: "Robbie Reyes / Ghost Rider",
    actor: "Gabriel Luna",
    director: "Season four recurring role",
    cast: "The first live-action Robbie Reyes, introduced in “The Ghost” and central to the Ghost Rider story pod.",
    source: "https://www.marvel.com/articles/tv-shows/the-ghost-rider-returns-on-the-explosive-season-finale-of-marvel-s-agents-of-s-h-i-e-l-d",
  },
];

const POSTER_VAULT = [
  {
    kind: "Official one-sheet",
    title: "Ghost Rider",
    year: "2007",
    dimensions: "1400 × 2100",
    preview: poster2007,
    previewWidth: 1400,
    previewHeight: 2100,
    original: "/ghost-rider/downloads/ghost-rider-2007-official-poster.png",
    source: "https://www.sonypictures.com/movies/ghostrider",
    sourceName: "Sony Pictures",
    layout: "poster",
  },
  {
    kind: "Official one-sheet",
    title: "Spirit of Vengeance",
    year: "2012",
    dimensions: "1400 × 2100",
    preview: poster2012,
    previewWidth: 1400,
    previewHeight: 2100,
    original: "/ghost-rider/downloads/spirit-of-vengeance-2012-official-poster.jpg",
    source: "https://www.sonypictures.com/movies/ghostriderspiritofvengeance",
    sourceName: "Sony Pictures",
    layout: "poster",
  },
  {
    kind: "Ultra-HD wallpaper",
    title: "Burning Road",
    year: "4K",
    dimensions: "3840 × 2400",
    preview: wallpaperRoad,
    previewWidth: 1400,
    previewHeight: 875,
    original: "/ghost-rider/downloads/ghost-rider-burning-road-4k.jpg",
    source: "https://wallup.net/movies-ghost-rider-motorcycle-fire/",
    sourceName: "Wallup",
    layout: "wide feature",
  },
  {
    kind: "Ultra-HD wallpaper",
    title: "Infernal Charge",
    year: "4K",
    dimensions: "3840 × 2160",
    preview: wallpaperCharge,
    previewWidth: 1400,
    previewHeight: 788,
    original: "/ghost-rider/downloads/ghost-rider-charge-4k.jpg",
    source: "https://wall.alphacoders.com/big.php?i=972055",
    sourceName: "Wallpaper Abyss",
    layout: "wide",
  },
  {
    kind: "Ultra-HD wallpaper",
    title: "Flame on Black",
    year: "5.3K",
    dimensions: "5300 × 2981",
    preview: wallpaperFlame,
    previewWidth: 1400,
    previewHeight: 787,
    original: "/ghost-rider/downloads/ghost-rider-flame-4k.jpg",
    source: "https://wall.alphacoders.com/big.php?i=547675",
    sourceName: "Wallpaper Abyss",
    layout: "wide",
  },
];

const RIDERS = [
  {
    name: "Johnny Blaze",
    era: "1972",
    copy: "A stunt rider whose desperate bargain turns every road into a reckoning.",
  },
  {
    name: "Danny Ketch",
    era: "1990",
    copy: "The midnight Rider who brought chains, shadows, and street-level horror.",
  },
  {
    name: "Robbie Reyes",
    era: "2014",
    copy: "A Los Angeles mechanic with a black Hell Charger and a different kind of curse.",
  },
  {
    name: "Kushala",
    era: "1800s",
    copy: "An Apache Spirit Rider and Sorcerer Supreme whose vengeance crosses centuries.",
  },
  {
    name: "Alejandra Jones",
    era: "2011",
    copy: "Chosen to inherit Zarathos, she turned against the zealot who trained her.",
  },
  {
    name: "Noble Kale",
    era: "18th century",
    copy: "An ancestor of Johnny and Danny whose curse runs through the Kale bloodline.",
  },
  {
    name: "Cosmic Ghost Rider",
    era: "Future",
    copy: "An alternate Frank Castle transformed by Mephisto and empowered by Galactus.",
  },
  {
    name: "The First Rider",
    era: "1,000,000 B.C.",
    copy: "A prehistoric Spirit of Vengeance who rode a blazing mammoth with the Stone Age Avengers.",
  },
];

const STORY = [
  {
    era: "Before history",
    title: "The Spirits of Vengeance",
    copy: "The Ghost Rider legacy begins long before motorcycles. Spirits of Vengeance appear across eras and cultures as supernatural forces created to punish wickedness. Later stories connect their stewardship to the rogue archangel Zadkiel, while some spirits serving Mephisto are explicitly demonic.",
    issue: "Ghost Rider (2006) #18 & #33",
  },
  {
    era: "1,000,000 B.C. - 1800s",
    title: "Riders before Blaze",
    copy: "A prehistoric Rider joins the Stone Age Avengers atop a flaming mammoth. Centuries later come Hellhawk, Noble Kale, and Kushala, the Apache Demon Rider who also becomes a Sorcerer Supreme. The fire is a lineage, not a single curse.",
    issue: "Avengers (2018) #7 • Doctor Strange and the Sorcerers Supreme (2016)",
  },
  {
    era: "1967",
    title: "The first Ghost Rider name",
    copy: "Western hero Carter Slade is the first Marvel character published under the Ghost Rider name. He is later renamed the Phantom Rider, separating his frontier legend from the flaming-skulled Spirits of Vengeance who follow.",
    issue: "Ghost Rider (1967) #1",
  },
  {
    era: "1972",
    title: "Johnny Blaze makes the deal",
    copy: "Stunt motorcyclist Johnny Blaze sells his soul to Mephisto to save his adoptive father, Crash Simpson, from cancer. Crash is cured but dies in a stunt. Mephisto then binds Johnny to Zarathos, transforming him into the blazing Ghost Rider.",
    issue: "Marvel Spotlight (1971) #5",
  },
  {
    era: "1970s - 1983",
    title: "Zarathos, hellfire, and freedom",
    copy: "Johnny fights Mephisto, Blackheart, demons, and mortal evil while struggling against Zarathos' hunger for vengeance. He rides with the Champions and other supernatural heroes. At last, Zarathos shatters the soul crystal of Centurious, freeing Johnny from their bond.",
    issue: "Ghost Rider (1973) #1-81",
  },
  {
    era: "1990",
    title: "Danny Ketch takes the chain",
    copy: "After finding a mystical motorcycle in a junkyard, Danny Ketch becomes a new Ghost Rider when innocent blood is spilled. His era defines the transforming bike, hellfire chain, and Penance Stare. The spirit within him is eventually revealed as Noble Kale.",
    issue: "Ghost Rider (1990) #1",
  },
  {
    era: "1990s",
    title: "The Midnight Sons",
    copy: "Johnny returns without the curse, armed with a hellfire shotgun. He and Danny form the Spirits of Vengeance and become central to the Midnight Sons, Marvel's loose alliance against Lilith, the Lilin, and other supernatural threats. Danny is ultimately revealed as Johnny's brother.",
    issue: "Rise of the Midnight Sons (1992) • Spirits of Vengeance (1992)",
  },
  {
    era: "2006 - 2009",
    title: "Heaven's black ops",
    copy: "Johnny learns the Riders are tied to powers beyond the simple story Mephisto told him. He battles Lucifer and later the angel Zadkiel, who tries to seize Heaven by controlling the Spirits of Vengeance. Riders from across the world unite against him.",
    issue: "Ghost Rider (2006) • Heaven's on Fire (2009)",
  },
  {
    era: "2011",
    title: "Alejandra inherits Zarathos",
    copy: "A mysterious trainer named Adam removes Zarathos from Johnny and bonds the spirit to Alejandra Jones. She rebels against Adam's crusade, trains under Johnny, and takes the fight to Mephisto before Johnny ultimately reclaims Zarathos.",
    issue: "Ghost Rider (2011) #1-9",
  },
  {
    era: "2014",
    title: "Robbie Reyes and the Hell Charger",
    copy: "Los Angeles mechanic Robbie Reyes is murdered during a street race and resurrected through the spirit of his serial-killer uncle, Eli Morrow. His 1969 Charger becomes a supernatural weapon. Johnny later helps Robbie restrain Eli and direct the power toward evil.",
    issue: "All-New Ghost Rider (2014) #1-12",
  },
  {
    era: "2018 - 2021",
    title: "Johnny Blaze, King of Hell",
    copy: "After Mephisto is deposed, Johnny takes the throne of Hell and becomes its warden. The burden corrupts him, putting him against Danny, Robbie, and the Avengers. He eventually gives the throne back to Mephisto so he can oppose Lilith's invasion.",
    issue: "Doctor Strange: Damnation (2018) • Ghost Rider (2019)",
  },
  {
    era: "2022 - present",
    title: "The road never ends",
    copy: "Johnny returns to the highway while the larger mythology keeps expanding through Danny, Robbie, Kushala, surviving Riders, and new Spirits of Vengeance. The essential pattern remains unchanged: a human host, a supernatural fire, and guilt made impossible to escape.",
    issue: "Ghost Rider (2022) • Spirits of Vengeance (2024)",
  },
];

const STORY_ACTS = [
  {
    id: "ancient-spirits",
    number: "I",
    title: "Ancient Spirits",
    range: "Before history — 1967",
    chapters: STORY.slice(0, 3),
    start: 0,
  },
  {
    id: "johnny-blaze",
    number: "II",
    title: "Johnny Blaze",
    range: "1972 — 1983",
    chapters: STORY.slice(3, 5),
    start: 3,
  },
  {
    id: "midnight-sons",
    number: "III",
    title: "Ketch & the Midnight Sons",
    range: "1990 — 2009",
    chapters: STORY.slice(5, 8),
    start: 5,
  },
  {
    id: "modern-lineage",
    number: "IV",
    title: "The Modern Lineage",
    range: "2011 — present",
    chapters: STORY.slice(8),
    start: 8,
  },
];

const NAV_ITEMS = [
  { id: "production", label: "Origin" },
  { id: "story", label: "Chronicle" },
  { id: "legacy", label: "Riders" },
  { id: "screen", label: "Screen" },
  { id: "vault", label: "Vault" },
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = ["top", ...NAV_ITEMS.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let frame;

    const updateActiveSection = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 260);
      const current = sections.reduce(
        (active, section) => (section.offsetTop <= marker ? section.id : active),
        "top",
      );
      setActiveSection(current);
      frame = undefined;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return activeSection;
}

function useInitialHashPosition() {
  useEffect(() => {
    let frame;
    let cancelled = false;

    const positionHash = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id) {
          document
            .getElementById(id)
            ?.scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
    };

    positionHash();
    window.addEventListener("hashchange", positionHash);
    window.addEventListener("load", positionHash, { once: true });
    document.fonts?.ready.then(positionHash);

    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", positionHash);
      window.removeEventListener("load", positionHash);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

function SiteHeader({ reduceMotion, activeSection }) {
  const { scrollYProgress } = useScroll();

  return (
    <header className="nav">
      <a className="nav-brand" href="#top">GHOST RIDER <em>FAN ARCHIVE</em></a>
      <nav aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <span className="nav-year">SINCE 1972</span>
      <m.span
        className="reading-progress"
        style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
        aria-hidden="true"
      />
    </header>
  );
}

function Hero({ reduceMotion }) {
  const { scrollYProgress } = useScroll();
  const stageY = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion ? 0 : 110]);
  const wordY = useTransform(scrollYProgress, [0, 0.2], [0, reduceMotion ? 0 : -50]);

  return (
    <section className="hero" id="top">
      <div className="hero-tags" aria-label="Archive status">
        <span>Independent fan archive</span><span>Fan-run</span><span>Unaffiliated</span>
      </div>

      <div className="hero-credit credit-left"><small>First appearance</small> Marvel Spotlight #5</div>
      <div className="hero-credit credit-right"><small>Debut</small> August 1972</div>

      <m.div className="hero-disc" style={{ x: "-50%", y: wordY }} aria-hidden="true" />
      <m.div
        className="hero-main-logo"
        initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0.75 }}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={ghostRiderLogo}
          alt="Ghost Rider fan archive title treatment"
          width="992"
          height="520"
          fetchPriority="high"
          decoding="async"
        />
      </m.div>

      <m.div className="character-stage is-spirit" style={{ x: "-50%", y: stageY }}>
        <m.img
          className="comic-rider"
          src={comicRider}
          alt="Comic Ghost Rider with a flaming skull"
          width="988"
          height="1495"
          fetchPriority="high"
          decoding="async"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="heat" aria-hidden="true" />
      </m.div>

      <div className="hero-copy">
        <span className="hero-kicker">A fan-made chronology of major Riders</span>
        <h1>Vengeance burns eternal.</h1>
        <p>Every era. Every major Rider. Every road through Hell.</p>
      </div>

      <div className="ember-field" aria-hidden="true">
        {Array.from({ length: 26 }, (_, index) => (
          <i
            key={index}
            style={{
              "--x": `${(index * 43) % 97}%`,
              "--drift": `${((index % 3) - 1) * 48}px`,
              "--duration": `${4.8 + ((index * 7) % 38) * 0.1}s`,
              "--delay": `${index * -0.37}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-seam" aria-hidden="true" />
    </section>
  );
}

const MARQUEE_ITEMS = [
  "Johnny Blaze",
  "Spirit of Vengeance",
  "Danny Ketch",
  "Hell Cycle",
  "Robbie Reyes",
  "Penance Stare",
  "Mystic Chain",
];

function RiderMarquee({ reduceMotion }) {
  const { scrollYProgress } = useScroll();
  const trackX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -320]);

  return (
    <div className="rider-marquee" aria-hidden="true">
      <m.div style={{ x: trackX }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <span key={`${item}-${index}`}>{item}<i>◆</i></span>
        ))}
      </m.div>
    </div>
  );
}

function SceneCut({ number, title, subtitle }) {
  return (
    <div className="scene-cut" aria-hidden="true">
      <span>{number}</span>
      <div>
        <small>{subtitle}</small>
        <strong>{title}</strong>
      </div>
    </div>
  );
}

function HellcycleInterlude() {
  return (
    <section className="hellcycle" id="hellcycle" aria-labelledby="hellcycle-title">
      <img
        className="hellcycle-art"
        src={wallpaperRoad}
        alt="Ghost Rider powers through a turn on the flaming Hell Cycle while swinging a chain"
        width="1400"
        height="875"
        loading="lazy"
        decoding="async"
      />
      <div className="hellcycle-shade" aria-hidden="true" />
      <div className="hellcycle-copy">
        <span>Machine // Weapon</span>
        <h2 id="hellcycle-title">Ride the<br /><strong>Hell Cycle.</strong></h2>
        <p>
          The motorcycle and mystic chain are extensions of the Spirit of
          Vengeance—steel transformed, weaponized, and driven by hellfire.
        </p>
      </div>
      <div className="hellcycle-spec" aria-label="Hell Cycle archive details">
        <span>Hellfire wheels</span>
        <span>Mystic chain</span>
        <span>Spirit-bound steel</span>
      </div>
      <a
        className="hellcycle-source"
        href="https://wallup.net/movies-ghost-rider-motorcycle-fire/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Artwork source ↗
      </a>
    </section>
  );
}

function Production({ reduceMotion }) {
  return (
    <section className="production" id="production">
      <div className="production-rider" aria-hidden="true">
        <img
          src={comicRider}
          alt=""
          width="988"
          height="1495"
          loading="lazy"
          decoding="async"
        />
      </div>
      <m.div
        className="production-intro"
        initial={reduceMotion ? false : { opacity: 0, y: 45 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
      >
        <span>Johnny Blaze // Origin file</span>
        <h2>Born in fire.<br />Bound by vengeance.</h2>
        <p>
          Johnny Blaze was a stunt motorcyclist who bargained with Mephisto to
          save his adoptive father. The bargain twisted into a curse when Blaze
          was bound to Zarathos and became the Ghost Rider.
        </p>
      </m.div>
      <div className="credit-ledger">
        <m.div
          className="credit-entry"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <small>Comic debut</small><strong>Marvel Spotlight #5</strong><span>August 1972</span>
        </m.div>
        <m.div
          className="credit-entry"
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduceMotion ? undefined : { delay: 0.08 }}
        >
          <small>Human host</small><strong>Johnny Blaze</strong><span>Stunt rider</span>
        </m.div>
        <m.div
          className="credit-entry"
          initial={reduceMotion ? false : { opacity: 0, y: 70 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduceMotion ? undefined : { delay: 0.16 }}
        >
          <small>Bound spirit</small><strong>Zarathos</strong><span>Spirit of Vengeance</span>
        </m.div>
      </div>
      <blockquote>
        Every road has a price. Every sin leaves a mark.
      </blockquote>
      <div className="production-year" aria-hidden="true">1972</div>
    </section>
  );
}

function Story({ reduceMotion }) {
  return (
    <section className="story" id="story">
      <div className="story-heading">
        <span>The essential canon chronology</span>
        <h2>The full story<br />of the Rider.</h2>
        <p>
          The name begins in the Old West, the fire reaches back to prehistory,
          and the curse passes through generations of hosts.
        </p>
        <div className="story-source-note">
          Researched from Marvel character histories and official comic guides.
        </div>
        <nav className="era-index" aria-label="Chronology acts">
          {STORY_ACTS.map((act) => (
            <a key={act.id} href={`#${act.id}`}>
              <span>Act {act.number}</span>
              {act.title}
            </a>
          ))}
        </nav>
      </div>
      <div className="story-list">
        {STORY_ACTS.map((act) => (
          <section className="story-act" id={act.id} key={act.id} aria-labelledby={`${act.id}-title`}>
            <header className="act-heading">
              <span>Act {act.number}</span>
              <h3 id={`${act.id}-title`}>{act.title}</h3>
              <p>{act.range}</p>
            </header>
            {act.chapters.map((chapter, index) => (
              <m.article
                className={index === 0 ? "is-turning-point" : undefined}
                key={chapter.title}
                initial={reduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={reduceMotion ? undefined : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="chapter-meta">
                  <small>{String(act.start + index + 1).padStart(2, "0")}</small>
                  <span>{chapter.era}</span>
                </div>
                <h4>{chapter.title}</h4>
                <p>{chapter.copy}</p>
                <cite>{chapter.issue}</cite>
              </m.article>
            ))}
          </section>
        ))}
      </div>
      <div className="archive-sources">
        <span>Official sources</span>
        <a href="https://www.marvel.com/characters/ghost-rider-johnny-blaze/in-comics" target="_blank" rel="noopener noreferrer" aria-label="Johnny Blaze history (opens in a new tab)">Johnny Blaze history ↗</a>
        <a href="https://www.marvel.com/articles/comics/every-ghost-rider-in-marvel-comics-spirits-of-vengeance-history" target="_blank" rel="noopener noreferrer" aria-label="Every Ghost Rider (opens in a new tab)">Every Ghost Rider ↗</a>
        <a href="https://www.marvel.com/teams-and-groups/spirits-of-vengeance" target="_blank" rel="noopener noreferrer" aria-label="Spirits of Vengeance (opens in a new tab)">Spirits of Vengeance ↗</a>
      </div>
    </section>
  );
}

function Legacy({ reduceMotion }) {
  return (
    <section className="legacy" id="legacy">
      <div className="legacy-head">
        <span>Spirits of Vengeance</span>
        <h2>The fire chooses<br />more than one.</h2>
      </div>
      <div className="rider-grid">
        {RIDERS.map((rider, index) => (
          <m.article
            key={rider.name}
            data-era={rider.era}
            initial={reduceMotion ? false : { opacity: 0, y: 35 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={reduceMotion ? undefined : { delay: Math.min(index * 0.04, 0.16) }}
          >
            <span>{rider.era}</span>
            <h3>{rider.name}</h3>
            <p>{rider.copy}</p>
          </m.article>
        ))}
      </div>
    </section>
  );
}

function ScreenHistory({ reduceMotion }) {
  return (
    <section className="screen-history" id="screen">
      <header className="screen-head">
        <div>
          <span>Live-action archive</span>
          <h2>The Rider<br />on screen.</h2>
        </div>
        <p>
          Two theatrical films, one television incarnation, and a newly confirmed
          road into the Marvel Cinematic Universe.
        </p>
      </header>

      <m.article
        className="mcu-announcement"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduceMotion ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="announcement-status">
          <span>Officially confirmed</span>
          <strong>2028</strong>
        </div>
        <div className="announcement-title">
          <small>Marvel Studios presents</small>
          <h3>Ryan Gosling<br />is Ghost Rider.</h3>
        </div>
        <div className="announcement-copy">
          <p>
            Marvel Studios announced the film at San Diego Comic-Con 2026.
            Shawn Levy will direct, with Gosling starring as the title Rider.
            Marvel has not yet identified which Ghost Rider incarnation he will play.
          </p>
          <div>
            <a
              href="https://www.marvel.com/articles/movies/marvel-studios-ghost-rider-ryan-gosling-comic-con-2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Marvel announcement ↗
            </a>
            <a
              href="https://apnews.com/article/35f4476d32fdd55acc7bcbe608a8e2d2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Independent confirmation ↗
            </a>
          </div>
        </div>
      </m.article>

      <div className="screen-reel">
        {SCREEN_HISTORY.map((entry, index) => (
          <m.article
            className="screen-entry"
            key={entry.title}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={reduceMotion ? undefined : { delay: Math.min(index * 0.06, 0.12) }}
          >
            <div className="screen-entry-art">
              {entry.image ? (
                <img
                  src={entry.image}
                  alt={entry.imageAlt}
                  width={entry.width}
                  height={entry.height}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="screen-broadcast" aria-hidden="true">
                  <span>Robbie</span>
                  <strong>Reyes</strong>
                  <b>Hell Charger // Season 4</b>
                </div>
              )}
            </div>
            <div className="screen-entry-year">
              <span>{entry.format}</span>
              <strong>{entry.year}</strong>
            </div>
            <div className="screen-entry-copy">
              <h3>{entry.title}</h3>
              <dl>
                <div><dt>Rider</dt><dd>{entry.rider}</dd></div>
                <div><dt>Played by</dt><dd>{entry.actor}</dd></div>
                <div><dt>Direction</dt><dd>{entry.director}</dd></div>
                <div><dt>Also starring</dt><dd>{entry.cast}</dd></div>
              </dl>
              <a href={entry.source} target="_blank" rel="noopener noreferrer">
                Verified source ↗
              </a>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
}

function VaultFigure({ item, reduceMotion }) {
  return (
    <m.figure
      className={`vault-item ${item.layout}`}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={reduceMotion ? undefined : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        className="vault-image"
        href={item.original}
        download
        aria-label={`Open full-resolution ${item.title}`}
      >
        <img
          src={item.preview}
          alt={`${item.title} — ${item.kind}`}
          width={item.previewWidth}
          height={item.previewHeight}
          loading="lazy"
          decoding="async"
        />
        <span>Full resolution ↗</span>
      </a>
      <figcaption>
        <div>
          <small>{item.kind}</small>
          <strong>{item.title}</strong>
        </div>
        <div>
          <b>{item.year}</b>
          <span>{item.dimensions}</span>
        </div>
        <a href={item.source} target="_blank" rel="noopener noreferrer">
          Source: {item.sourceName} ↗
        </a>
      </figcaption>
    </m.figure>
  );
}

function PosterVault({ reduceMotion }) {
  const posters = POSTER_VAULT.filter((item) => item.layout === "poster");
  const wallpapers = POSTER_VAULT.filter((item) => item.layout !== "poster");

  return (
    <section className="poster-vault" id="vault">
      <header className="vault-head">
        <div>
          <span>Poster & wallpaper vault</span>
          <h2>Five frames<br />from the inferno.</h2>
        </div>
        <div className="vault-intro">
          <strong>2 official posters // 3 ultra-HD wallpapers</strong>
          <p>
            Optimized previews keep the archive fast. Open any frame for the
            full-resolution file, and use the source link for attribution and usage terms.
          </p>
        </div>
      </header>

      <div className="poster-pair">
        {posters.map((item) => (
          <VaultFigure item={item} reduceMotion={reduceMotion} key={item.title} />
        ))}
      </div>

      <div className="wallpaper-run">
        {wallpapers.map((item) => (
          <VaultFigure item={item} reduceMotion={reduceMotion} key={item.title} />
        ))}
      </div>

      <p className="vault-rights">
        Fan-archive presentation only. Ghost Rider imagery and trademarks remain
        the property of Marvel and their respective rights holders. Third-party
        wallpaper sources are linked on every frame.
      </p>
    </section>
  );
}

function FinalPoster() {
  return (
    <section className="final-poster">
      <img
        className="final-bike"
        src={wallpaperRoad}
        alt=""
        width="1400"
        height="875"
        loading="lazy"
        decoding="async"
      />
      <div>
        <span>The independent fan archive</span>
        <img
          src={ghostRiderLogo}
          alt="Ghost Rider fan archive title treatment"
          width="992"
          height="520"
          loading="lazy"
          decoding="async"
        />
        <strong>1972</strong>
      </div>
      <footer className="final-legal">
        <a href="#top">Return to the road ↑</a>
        <p>Fan-run and unaffiliated. Ghost Rider and Marvel trademarks belong to their respective owners.</p>
      </footer>
    </section>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection();
  useInitialHashPosition();

  return (
    <LazyMotion features={domAnimation}>
      <a className="skip-link" href="#main-content">Skip to the archive</a>
      <SiteHeader reduceMotion={reduceMotion} activeSection={activeSection} />
      <main id="main-content">
        <Hero reduceMotion={reduceMotion} />
        <RiderMarquee reduceMotion={reduceMotion} />
        <HellcycleInterlude />
        <Production reduceMotion={reduceMotion} />
        <Story reduceMotion={reduceMotion} />
        <SceneCut number="03" subtitle="The bloodline" title="Many hosts. One curse." />
        <Legacy reduceMotion={reduceMotion} />
        <SceneCut number="04" subtitle="The screen archive" title="The legend becomes cinema." />
        <ScreenHistory reduceMotion={reduceMotion} />
        <PosterVault reduceMotion={reduceMotion} />
        <FinalPoster />
      </main>
    </LazyMotion>
  );
}
