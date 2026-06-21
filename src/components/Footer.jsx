import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 px-[10%] bg-black border-t border-white/5 relative z-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="footer-col">
          <h4 className="font-display text-2xl tracking-[0.1em] text-accent-gold mb-6 uppercase">Follow</h4>
          <ul>
            {[
              { label: 'Instagram', href: 'https://instagram.com/mani_sandeep__' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/mani-sandeep' },
              { label: 'GitHub', href: 'https://github.com/manisandeep' },
              { label: 'YouTube', href: 'https://youtube.com/@manisandeep' },
            ].map(({ label, href }) => (
              <li key={label} className="mb-3 overflow-hidden group">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg/50 hover:text-accent-gold transition-colors duration-300 relative inline-block"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="font-display text-2xl tracking-[0.1em] text-accent-gold mb-6 uppercase">Mail</h4>
          <ul>
            <li className="mb-3 text-fg/50 text-[0.95rem] group overflow-hidden">
              New Business:{' '}
              <a href="mailto:gmanisandeep@gmail.com?subject=Hello Mani" className="text-fg/50 hover:text-accent-gold transition-colors duration-300 relative inline-block">
                gmanisandeep@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
            <li className="mb-3 text-fg/50 text-[0.95rem] group overflow-hidden">
              Collabs:{' '}
              <a href="mailto:gmanisandeep@gmail.com?subject=Collaboration Inquiry" className="text-fg/50 hover:text-accent-gold transition-colors duration-300 relative inline-block">
                Collaborate with me
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
            <li className="mb-3 text-fg/50 text-[0.95rem] group overflow-hidden">
              Jobs:{' '}
              <a href="mailto:gmanisandeep@gmail.com?subject=Hiring Inquiry" className="text-fg/50 hover:text-accent-gold transition-colors duration-300 relative inline-block">
                Hire me
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="font-display text-2xl tracking-[0.1em] text-accent-gold mb-6 uppercase">Location</h4>
          <ul>
            <li className="mb-3 text-fg/50 text-[0.95rem]">Hyderabad, India 🇮🇳</li>
            <li className="mb-3 text-fg/50 text-[0.95rem]">IST (UTC+5:30)</li>
            <li className="mb-3 text-fg/50 text-[0.95rem]">Available for Remote</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between border-t border-white/5 pt-9 font-heading text-[0.65rem] font-bold tracking-[0.12em] text-fg/25 uppercase">
        <span>Design inspired by Pigeon&amp;Co.</span>
        <span>Built by Mani Sandeep</span>
        <span>© 2026 Mani Sandeep</span>
      </div>
    </footer>
  );
}
