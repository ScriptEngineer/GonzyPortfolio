import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../siteConfig';
import Logo3D from './Logo3D';
import HeroNetwork from './HeroNetwork';

const frankensteinLogo = new URL('/img/frankenstein-logo.png', import.meta.url);
const genieLogo = new URL('/img/genie.svg', import.meta.url);

// Real-time 3D logo (Three.js) that rotates toward the mouse.
function HeroLogo() {
  return (
    <div className="logo-3d">
      <Logo3D />
    </div>
  );
}

// Hero: interactive WebGL node network (background) + floating 3D logo + branding.
export default function Hero() {
  return (
    <div className="section__hero">

      {/* Interactive WebGL constellation replaces the old static SVG graphic. */}
      <HeroNetwork />

      <div className="row">

        <div className="section__hero__presentation">
          <div className="logo-glass-card">
            <div className="logo-3d-container">
              <HeroLogo />
            </div>
          </div>
        </div>

        <div className="section__hero__branding">
          <div className="section__hero__branding__content">
            <h1>{COMPANY.shortName.toLowerCase()}</h1>
            <p>{COMPANY.tagline.toLowerCase()}</p>
            <div className="hero__cta">
              <h3>Smart software, built for your business.</h3>
              <div className="hero__cta__buttons">
                <Link to="/products/frankenstein-audio" className="hero__cta__btn hero__cta__btn--secondary">
                  <img src={frankensteinLogo} alt="" className="hero__cta__btn__icon hero__cta__btn__icon--invert" />
                  FRANKENSTEIN AUDIO
                </Link>
                <Link to="/products/brandgenie" className="hero__cta__btn hero__cta__btn--secondary">
                  <img src={genieLogo} alt="" className="hero__cta__btn__icon hero__cta__btn__icon--genie" />
                  BRANDGENIE
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <a href="#what-we-do" className="hero__scroll-indicator">
        <span>WHAT WE DO</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </a>

    </div>
  );
}
