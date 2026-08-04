import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../siteConfig';
import Logo3D from './Logo3D';
import HeroNetwork from './HeroNetwork';

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
              <Link to="/products" className="hero__cta__btn hero__cta__btn--primary">
                EXPLORE OUR PRODUCTS
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
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
