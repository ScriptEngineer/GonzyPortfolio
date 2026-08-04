import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '../siteConfig';

const logo = new URL('/img/gonzydesigns_logo.svg', import.meta.url);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const close = () => { setOpen(false); setDropdown(null); };

  // Close an open dropdown when clicking anywhere outside the nav.
  useEffect(() => {
    const onClickAway = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener('pointerdown', onClickAway);
    return () => document.removeEventListener('pointerdown', onClickAway);
  }, []);

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

        <nav ref={navRef} className={`site-header__nav ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            link.children ? (
              <div
                key={link.label}
                className={`site-header__dropdown ${dropdown === link.label ? 'is-open' : ''}`}
              >
                <button
                  className={`site-header__link site-header__dropdown-toggle ${
                    link.children.some((c) => pathname.startsWith(c.to)) ? 'is-active' : ''
                  }`}
                  aria-expanded={dropdown === link.label}
                  onClick={() => setDropdown((d) => (d === link.label ? null : link.label))}
                >
                  {link.label}
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="site-header__dropdown-menu">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        `site-header__dropdown-link ${isActive ? 'is-active' : ''}`
                      }
                      onClick={close}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
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
            )
          ))}
          <Link to="/contact" className="site-header__cta" onClick={close}>
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
