import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '../siteConfig';

const logo = new URL('/img/gonzydesigns_logo.svg', import.meta.url);

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" onClick={close}>
          <img src={logo} alt={`${COMPANY.shortName} logo`} className="site-header__logo" />
          <span className="site-header__name">{COMPANY.shortName}</span>
        </Link>

        <button
          className={`site-header__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `site-header__link ${isActive ? 'is-active' : ''}`
              }
              onClick={close}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="site-header__cta" onClick={close}>
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
