import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bank,
  Buildings,
  CaretDown,
  CheckCircle,
  CreditCard,
  DeviceMobile,
  Globe,
  Headset,
  FileText,
  MagnifyingGlass,
  MapPin,
  Receipt,
  Storefront,
  Warning,
  DownloadSimple,
  List,
  LockKey,
  Moon,
  PaperPlaneTilt,
  PiggyBank,
  QrCode,
  ShieldCheck,
  Sparkle,
  Sun,
  TrendUp,
  User,
  Wallet,
  X,
} from "@phosphor-icons/react";

const services = [
  { icon: Wallet, title: "Savings", copy: "Accounts that move at your pace.", tone: "red", size: "wide" },
  { icon: PaperPlaneTilt, title: "Pay & transfer", copy: "Send money in a few confident taps.", tone: "photo", size: "tall" },
  { icon: CreditCard, title: "Cards", copy: "Control, rewards and instant limits.", tone: "plain", size: "small" },
  { icon: TrendUp, title: "Invest", copy: "Start small. Build a steady habit.", tone: "pattern", size: "small" },
  { icon: Buildings, title: "Loans", copy: "Clear options for your next chapter.", tone: "blue", size: "wide" },
];

const faqs = [
  ["How do I start internet banking?", "Use the official registration flow linked from Union Bank. This concept does not create or access bank accounts."],
  ["Is this an official Union Bank website?", "No. This is an independent portfolio redesign concept created to demonstrate a possible digital experience."],
  ["Can I enter my banking details here?", "No. Never enter a User ID, password, PIN or OTP into this concept website."],
];

const officialServiceGroups = [
  {
    id: "access",
    label: "Digital banking",
    icon: DeviceMobile,
    description: "Login, registration and account access tools.",
    items: [
      ["Retail user login", "https://www.unionbankonline.bank.in/corp/AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=026&LANGUAGE_ID=001"],
      ["Corporate user login", "https://www.unionbankonline.bank.in/corp/AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=7&BANK_ID=026&LANGUAGE_ID=001"],
      ["Know your User ID", "https://www.unionbankonline.bank.in/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__EVENT_ID__=LOAD&ACTION.LOAD=Y&__CALL_MODE__=79&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=026"],
      ["Self user creation", "https://www.unionbankonline.bank.in/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__EVENT_ID__=LOAD&ACTION.LOAD=Y&__CALL_MODE__=52&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=026"],
      ["Forgot or create password", "https://www.unionbankonline.bank.in/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__EVENT_ID__=LOAD&ACTION.LOAD=Y&__CALL_MODE__=51&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=026"],
      ["Password creation guide", "https://www.unionbankonline.bank.in/InternetBankingProductDemos/Ret_Corp_Writeup.pdf"],
      ["Mobile banking", "https://www.unionbankofindia.co.in/english/personal-mob-overview.aspx"],
      ["SMS banking", "https://www.unionbankofindia.co.in/english/personal-alternate-smsbanking.aspx"],
      ["Internet banking user guide", "https://www.unionbankonline.bank.in/InternetBankingProductDemos/FEBA_Guide.html"],
    ],
  },
  {
    id: "payments",
    label: "Bills and payments",
    icon: Receipt,
    description: "Bills, cards, education and everyday payments.",
    items: [
      ["Telephone and mobile bills", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["View credit card bill", "https://unioncards.unionbankofindia.co.in/"],
      ["Pay credit card bill", "https://unioncards.unionbankofindia.co.in/"],
      ["EMI, utility and card payments", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["Municipal corporations", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["Nagar Nigams", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["Education fee payments", "https://www.unionbankonline.bank.in/"],
      ["MP Online", "https://www.mponline.gov.in/"],
      ["Maha Online", "https://www.mahaonline.gov.in/site/home/index.aspx"],
      ["EPFO", "http://www.epfindia.com/"],
      ["ESIC", "http://www.esic.nic.in/online_application.php"],
      ["Insurance and mutual fund payments", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["Travel payments", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
      ["FASTag recharge", "https://etc9sign.ventureinfotek.com/ubibnetc/"],
      ["Utility bill payments", "https://www.unionbankofindia.co.in/en/Details/bharat-bill-payment-system"],
    ],
  },
  {
    id: "tax",
    label: "Tax and government",
    icon: Bank,
    description: "Central, state, customs and treasury services.",
    items: [
      ["Direct tax", "https://onlineservices.tin.nsdl.com/etaxnew/tdsnontds.jsp"],
      ["Online tax payments", "https://www.unionbankofindia.co.in/en/common/online-tax-payment"],
      ["Union e-Tax", "https://www.unionbankofindia.co.in/english/personal-online-uniontax.aspx"],
      ["AP commercial tax", "https://www.apct.gov.in/"],
      ["CG e-Challan", "https://cg.nic.in/"],
      ["Rajasthan tax and challan", "http://rajtax.gov.in/"],
      ["Excise and service tax", "https://cbec.nsdl.com/EST"],
      ["Odisha commercial tax", "https://odishatax.gov.in/"],
      ["Karnataka commercial tax", "https://vat.kar.nic.in/epay"],
      ["UP tax and challan", "http://comtax.up.nic.in/"],
      ["Customs duty", "http://www.icegate.gov.in/"],
      ["DGFT", "http://dgft.gov.in/"],
      ["Bihar OGRAS", "https://e-nidhi-v2.bihar.gov.in/rms-portal-ui/rms_WelcomePage"],
      ["Maharashtra VAT, CST and PT", "https://eremit.unionbankofindia.co.in/verifytax"],
      ["Port Trust PCS", "https://www.indianpcs.gov.in/ipacpsweb/c"],
      ["Maharashtra e-SBTR", "https://www.unionbankonline.bank.in/corp/BANKAWAY?Action.Maharashtra.esbtr.main=Y"],
      ["Maharashtra Mahakosh", "https://www.mahakosh.gov.in/"],
      ["MCA21", "http://www.mca.gov.in/MCA21"],
      ["MP Treasury", "http://www.mptreasury.org/"],
      ["Uttarakhand tax", "http://comtax.uk.gov.in/"],
      ["Rajasthan e-GRAS", "https://egras.raj.nic.in/"],
    ],
  },
  {
    id: "wealth",
    label: "Invest and protect",
    icon: TrendUp,
    description: "Investments, insurance, trading and retirement.",
    items: [
      ["Mutual funds and investment", "https://www.unionbankofindia.co.in/english/personal-mutualfund.aspx"],
      ["Demat services", "https://www.unionbankofindia.co.in/english/personal-insurance-dematoverview.aspx"],
      ["Online trading", "https://www.unionbankofindia.co.in/en/Details/union-demat-and-online-trading-services"],
      ["ASBA", "http://www.unionbankofindia.co.in/english/personal_insurance_ASBA_overview.aspx"],
      ["RBI Retail Direct", "https://rbiretaildirect.org.in/"],
      ["National Pension System", "https://www.unionbankofindia.co.in/en/Details/national-pension-system-nps"],
      ["Kisan Vikas Patra", "https://www.unionbankofindia.co.in/en/Details/kisan-vikas-patra-kvp"],
      ["General insurance", "https://www.unionbankofindia.co.in/en/Details/bajaj-allianz-general-insurance"],
      ["Government saving schemes", "https://www.unionbankofindia.co.in/en/Listing/Government-Saving-Schemes"],
      ["CDSL Demat FAQs", "https://www.cdslindia.com/Investors/FAQs.html"],
      ["NSDL Demat FAQs", "https://nsdl.co.in/faqs/faq.php"],
      ["Settlement calendar", "https://www.bseindia.com/markets/equity/EQReports/setcal.aspx"],
    ],
  },
  {
    id: "credit",
    label: "Loans and business",
    icon: Storefront,
    description: "Credit, trade finance and business services.",
    items: [
      ["Online loan application", "https://www.unionbankofindia.co.in/english/digi-selfservice-banking.aspx#loan"],
      ["Instant personal loan", "https://instaloan.unionbankofindia.co.in/lendperfect/landing"],
      ["Credit card overview", "https://unioncards.unionbankofindia.co.in/"],
      ["Pre-approved credit card", "https://bit.ly/3y8hXnY"],
      ["Generate CIBIL score", "https://www.cibil.com/"],
      ["Value chain finance", "https://trade.unionbankofindia.bank.in/UBIFCC/portal"],
      ["LC, BG and forex remittance", "https://trade.unionbankofindia.bank.in/UBIFCC/portal"],
      ["Apply for POS", "https://play.google.com/store/apps/details?id=com.worldline.unionBank"],
      ["Union e-Remit", "https://www.unionbankofindia.co.in/english/ibd-remittance-eremit.aspx"],
      ["Agri advisory services", "https://www.unionbankofindia.bank.in/english/agriculture-loan.aspx?#1"],
      ["UECLGS support", "https://www.jansamarth.in/"],
      ["Online account opening", "https://www.unionbankofindia.bank.in/en/listing/online-account-opening"],
    ],
  },
  {
    id: "support",
    label: "Support and forms",
    icon: FileText,
    description: "Documents, nominations, grievances and assistance.",
    items: [
      ["Internet banking application", "https://www.unionbankonline.bank.in/Upload/IBApplication.pdf"],
      ["Add more accounts", "https://www.unionbankonline.bank.in/Upload/aofmaccounts.doc"],
      ["Partnership firm declaration", "https://www.unionbankonline.bank.in/Upload/DeclReso_PartnershipFirms.doc"],
      ["Company resolution", "https://www.unionbankonline.bank.in/Upload/DeclReso_Companies.doc"],
      ["HUF and society application", "https://www.unionbankonline.bank.in/Upload/HUF_Society.doc"],
      ["Digital signature linking form", "https://www.unionbankonline.bank.in/Upload/DSC_Linkage_Application_Form.pdf"],
      ["Online nomination", "https://icmt.unionbankofindia.co.in/nomination/"],
      ["Branch and ATM locator", "https://eremit.unionbankofindia.co.in/livebranch/ATMSearch.aspx"],
      ["Doorstep banking", "https://www.psballiance.com/doorstep-banking.html"],
      ["DigiLocker", "https://digilocker.gov.in/"],
      ["DigiSaathi helpline", "https://www.digisaathi.info/"],
      ["Call centre", "https://www.unionbankofindia.co.in/english/personal-other-callcenter.aspx"],
      ["Contact us", "https://www.unionbankonline.bank.in/ContactUs.html"],
      ["Online grievances", "https://service.unionbankportal.co.in/portal/en/home"],
      ["Grievance procedure", "https://www.unionbankonline.bank.in/InternetBankingProductDemos/Procedure_to_lodge_grievance_online.pdf"],
      ["Accessibility", "https://www.unionbankonline.bank.in/accessibility.html"],
      ["RBI limited liability policy", "https://www.unionbankonline.bank.in/Upload/RBI_Limited_Liability.pdf"],
      ["Challenge question guide", "https://www.unionbankonline.bank.in/Challange_doc.pdf"],
      ["Card tokenisation features", "https://www.unionbankonline.bank.in/InternetBankingProductDemos/CardTokenisation/Tokenisation_Product_Features.pdf"],
      ["Card tokenisation FAQs", "https://www.unionbankonline.bank.in/InternetBankingProductDemos/CardTokenisation/FAQs_on_Tokenisation.pdf"],
    ],
  },
];

const quickActions = [
  [User, "Know User ID", officialServiceGroups[0].items[2][1]],
  [DeviceMobile, "Register online", officialServiceGroups[0].items[3][1]],
  [LockKey, "Reset password", officialServiceGroups[0].items[4][1]],
  [Wallet, "Open account", officialServiceGroups[4].items[11][1]],
  [MapPin, "Find branch", officialServiceGroups[5].items[7][1]],
  [DownloadSimple, "Download forms", "#all-services"],
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Union Bank concept home">
      <span className="brand-logo-shell">
        <img src="/assets/union-bank-logo.png" alt="Union Bank of India" />
      </span>
    </a>
  );
}

function Header({ onLogin, theme, onTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#services" onClick={() => setOpen(false)}>Accounts</a>
          <a href="#all-services" onClick={() => setOpen(false)}>All services</a>
          <a href="#life" onClick={() => setOpen(false)}>Life & money</a>
          <a href="#support" onClick={() => setOpen(false)}>Support</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={onTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="login-button" onClick={onLogin}><LockKey size={17} /> Login</button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={23} /> : <List size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function LoginModal({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            tabIndex={-1}
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close login dialog"><X size={20} /></button>
            <div className="modal-icon"><ShieldCheck size={30} /></div>
            <p className="eyebrow">Safe demo</p>
            <h2 id="login-title">Bank on the official site</h2>
            <p>This portfolio concept never asks for your User ID, password, PIN or OTP.</p>
            <a className="primary-button full" href="https://www.unionbankonline.bank.in/" target="_blank" rel="noreferrer">
              Open official banking <ArrowRight size={18} />
            </a>
            <button className="text-button" onClick={onClose}>Continue exploring concept</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ onLogin }) {
  const reduce = useReducedMotion();
  return (
    <main id="top">
      <section className="hero section-shell">
        <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow"><Sparkle size={15} /> Banking for your era</p>
          <h1>Money moves.<br /><span>So do you.</span></h1>
          <p className="hero-sub">Simple banking for every plan, payment and plot twist.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onLogin}>Login securely <ArrowRight size={18} /></button>
            <a className="secondary-button" href="#services">Explore services</a>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduce ? false : { opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <img src="/assets/hero-genz.png" alt="Young Indian friends using a smartphone together" />
          <div className="hero-note">
            <QrCode size={26} />
            <span><strong>Tap. Pay. Done.</strong><small>UPI that keeps up</small></span>
          </div>
        </motion.div>
      </section>

      <section className="trust-strip" aria-label="Security features">
        <div className="section-shell trust-inner">
          <span><ShieldCheck size={22} /> Safe banking habits</span>
          <span><Globe size={22} /> Hindi and English</span>
          <span><Headset size={22} /> Support when you need it</span>
        </div>
      </section>
    </main>
  );
}

function QuickActions() {
  return (
    <section className="quick-actions section-shell" aria-label="Popular banking shortcuts">
      {quickActions.map(([Icon, label, href]) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          <span><Icon size={23} weight="duotone" /></span>
          <strong>{label}</strong>
          <ArrowRight size={17} />
        </a>
      ))}
    </section>
  );
}

function Services() {
  return (
    <section className="services section-shell" id="services">
      <Reveal className="section-intro">
        <h2>Everything money.<br />Nothing complicated.</h2>
        <p>Find the right account, move money or plan what comes next.</p>
      </Reveal>
      <div className="bento-grid">
        {services.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.05} className={`service-card ${item.size} ${item.tone}`}>
              {item.tone === "photo" && <img src="/assets/creator-studio.png" alt="Young Indian creators planning their business" />}
              <div className="service-content">
                <Icon size={30} weight="duotone" />
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                <ArrowRight className="service-arrow" size={21} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function AllServices() {
  const [activeGroup, setActiveGroup] = useState("access");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return officialServiceGroups.find((group) => group.id === activeGroup)?.items || [];
    return officialServiceGroups.flatMap((group) => group.items.map((item) => ({ item, group: group.label })))
      .filter(({ item, group }) => `${item[0]} ${group}`.toLowerCase().includes(normalizedQuery));
  }, [activeGroup, normalizedQuery]);
  const currentGroup = officialServiceGroups.find((group) => group.id === activeGroup);

  return (
    <section className="all-services section-shell" id="all-services">
      <Reveal className="directory-heading">
        <h2>Every service.<br />One clear directory.</h2>
        <p>Search the full set of services available from Union Bank’s official internet-banking portal.</p>
      </Reveal>

      <div className="service-search">
        <MagnifyingGlass size={22} />
        <label htmlFor="service-search">Search all services</label>
        <input id="service-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try tax, loan, FASTag or nomination" />
        {query && <button onClick={() => setQuery("")} aria-label="Clear service search"><X size={18} /></button>}
      </div>

      {!normalizedQuery && (
        <div className="directory-layout">
          <div className="directory-tabs" role="tablist" aria-label="Service categories">
            {officialServiceGroups.map((group) => {
              const Icon = group.icon;
              return (
                <button key={group.id} className={activeGroup === group.id ? "active" : ""} onClick={() => setActiveGroup(group.id)} role="tab" aria-selected={activeGroup === group.id}>
                  <span><Icon size={23} weight="duotone" /></span>
                  <span><strong>{group.label}</strong><small>{group.items.length} services</small></span>
                  <ArrowRight size={18} />
                </button>
              );
            })}
          </div>
          <div className="directory-panel" role="tabpanel">
            <div className="directory-panel-heading">
              <h3>{currentGroup.label}</h3>
              <p>{currentGroup.description}</p>
            </div>
            <div className="service-link-grid">
              {results.map(([label, href]) => <OfficialServiceLink key={`${label}-${href}`} label={label} href={href} />)}
            </div>
          </div>
        </div>
      )}

      {normalizedQuery && (
        <div className="search-results" aria-live="polite">
          <div className="result-count"><strong>{results.length}</strong> matching services</div>
          {results.length > 0 ? (
            <div className="service-link-grid search-grid">
              {results.map(({ item: [label, href], group }) => <OfficialServiceLink key={`${label}-${href}`} label={label} href={href} meta={group} />)}
            </div>
          ) : (
            <div className="empty-result"><MagnifyingGlass size={34} /><h3>No service found</h3><p>Try a broader search such as payment, card, tax or form.</p></div>
          )}
        </div>
      )}
      <p className="official-handoff"><ShieldCheck size={18} /> Every service opens its official Union Bank or authorised partner destination in a new tab.</p>
    </section>
  );
}

function OfficialServiceLink({ label, href, meta }) {
  return (
    <a className="official-service-link" href={href} target="_blank" rel="noreferrer">
      <span>{meta && <small>{meta}</small>}<strong>{label}</strong></span>
      <ArrowRight size={17} />
    </a>
  );
}

function LifeMoney() {
  const points = ["Quick UPI payments", "Smart spending view", "Card controls in one place"];
  return (
    <section className="life section-shell" id="life">
      <Reveal className="life-image"><img src="/assets/cafe-banking.png" alt="Young woman using mobile banking at a cafe" /></Reveal>
      <Reveal className="life-copy" delay={0.08}>
        <p className="eyebrow">Union ease</p>
        <h2>Your bank fits in your life.</h2>
        <p>Pay, save and stay in control without turning money into homework.</p>
        <div className="point-list">
          {points.map((point) => <span key={point}><CheckCircle size={20} weight="fill" /> {point}</span>)}
        </div>
        <button className="secondary-button">Discover mobile banking</button>
      </Reveal>
    </section>
  );
}

function NeedPicker() {
  const [choice, setChoice] = useState("save");
  const choices = {
    save: { icon: PiggyBank, title: "Build a savings rhythm", copy: "Start with an account designed for everyday progress." },
    spend: { icon: CreditCard, title: "Spend with more control", copy: "Choose a card with simple controls and clear rewards." },
    grow: { icon: TrendUp, title: "Plan beyond today", copy: "Explore investment and deposit options at your pace." },
  };
  const item = choices[choice];
  const Icon = item.icon;
  return (
    <section className="picker-section">
      <div className="section-shell picker-grid">
        <Reveal className="picker-copy">
          <h2>What are you here for?</h2>
          <div className="choice-tabs" role="tablist" aria-label="Financial goals">
            {Object.keys(choices).map((key) => (
              <button key={key} className={choice === key ? "active" : ""} onClick={() => setChoice(key)} role="tab" aria-selected={choice === key}>
                {key === "save" ? "Save" : key === "spend" ? "Spend" : "Grow"}
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div className="choice-result" key={choice} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <Icon size={42} weight="duotone" />
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <button className="primary-button">See your options <ArrowRight size={18} /></button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SecurityNotices() {
  return (
    <section className="security-centre section-shell">
      <Reveal className="security-alert">
        <div className="warning-icon"><Warning size={34} weight="fill" /></div>
        <div><h2>Digital arrest calls are fake.</h2><p>Police, CBI and government agencies do not make arrests over video calls. Disconnect and report suspicious contact.</p></div>
        <a href="https://www.unionbankonline.bank.in/" target="_blank" rel="noreferrer">Fraud guidance <ArrowRight size={18} /></a>
      </Reveal>
      <Reveal className="security-resources" delay={0.08}>
        <h3>Security and account updates</h3>
        <div className="security-grid">
          <div><ShieldCheck size={25} /><strong>Email OTP</strong><p>Retail users can register an email address for OTP delivery in Password Management.</p></div>
          <div><LockKey size={25} /><strong>Three-factor authentication</strong><p>Challenge questions add another verification layer to internet banking.</p></div>
          <div><DeviceMobile size={25} /><strong>SIM swap awareness</strong><p>Contact the bank immediately if calls or messages suddenly stop working.</p></div>
          <div><Globe size={25} /><strong>Check the address</strong><p>Use HTTPS and type the official bank address directly into your browser.</p></div>
        </div>
      </Reveal>
    </section>
  );
}

function Support() {
  const [active, setActive] = useState(0);
  return (
    <section className="support section-shell" id="support">
      <Reveal className="support-heading">
        <Headset size={38} weight="duotone" />
        <h2>Help that speaks human.</h2>
        <p>Clear answers, fraud awareness and official support routes.</p>
      </Reveal>
      <Reveal className="faq-list" delay={0.08}>
        {faqs.map(([question, answer], index) => (
          <div className="faq-item" key={question}>
            <button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
              {question}<CaretDown size={20} className={active === index ? "rotated" : ""} />
            </button>
            <AnimatePresence initial={false}>
              {active === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{answer}</motion.p>}
            </AnimatePresence>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Footer({ onLogin }) {
  return (
    <footer>
      <div className="section-shell footer-top">
        <div><Brand /><p>Good people to bank with.</p></div>
        <button className="primary-button" onClick={onLogin}>Official login <ArrowRight size={18} /></button>
      </div>
      <div className="section-shell footer-links">
        <div><strong>Banking</strong><a href="#services">Accounts</a><a href="#services">Cards</a><a href="#services">Loans</a></div>
        <div><strong>Support</strong><a href="#support">Help centre</a><a href="#support">Fraud awareness</a><a href="#support">Contact</a></div>
        <div><strong>About</strong><a href="#top">Union Bank</a><a href="#top">Careers</a><a href="#top">Accessibility</a></div>
      </div>
      <div className="section-shell concept-note">
        <span>Unofficial redesign concept. No affiliation with Union Bank of India.</span>
        <span>Never enter banking credentials on this website.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("concept-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("concept-theme", theme);
  }, [theme]);
  return (
    <>
      <div className="concept-banner"><span>Portfolio concept</span><strong>Not an official banking website</strong></div>
      <Header onLogin={() => setLoginOpen(true)} theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <Hero onLogin={() => setLoginOpen(true)} />
      <QuickActions />
      <Services />
      <AllServices />
      <LifeMoney />
      <NeedPicker />
      <SecurityNotices />
      <Support />
      <Footer onLogin={() => setLoginOpen(true)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
