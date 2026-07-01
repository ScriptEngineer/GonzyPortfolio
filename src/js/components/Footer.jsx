import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, NAV_LINKS, formatAddress } from '../siteConfig';

const logo = new URL('/img/gonzydesigns_logo.svg', import.meta.url);
const year = 2026; // build-time constant; bump on rebuild

export default function Footer() {
  const address = formatAddress();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__brand-link">
            <img src={logo} alt={`${COMPANY.shortName} logo`} className="site-footer__logo" />
            <span>{COMPANY.shortName}</span>
          </Link>
          <p className="site-footer__tagline">{COMPANY.tagline}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <h4>Navigate</h4>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="site-footer__link">
              {link.label}
            </Link>
          ))}
          <Link to="/privacy" className="site-footer__link">Privacy Policy</Link>
        </nav>

        <div className="site-footer__contact">
          <h4>Contact</h4>
          <p className="site-footer__company">{COMPANY.legalName}</p>
          {address && <p>{address}</p>}
          <p>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </p>
          <p>
            <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phoneDisplay}</a>
          </p>
        </div>
      </div>

      <div className="site-footer__bar">
        <span>&copy; {year} {COMPANY.legalName}. All rights reserved.</span>
        <span className="site-footer__bar-links">
          <Link to="/privacy">Privacy</Link>
        </span>
      </div>
    </footer>
  );
}
