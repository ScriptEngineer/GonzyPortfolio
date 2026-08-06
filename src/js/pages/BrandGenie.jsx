import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY } from '../siteConfig';

const APP_URL = 'https://www.geniedesign.online/';
const genieLogo = new URL('/img/genie.svg', import.meta.url);
const demoSpin = new URL('/img/genie-demo-spin.webm', import.meta.url);
const demoAssemble = new URL('/img/genie-demo-assemble.webm', import.meta.url);
const demoDrawOn = new URL('/img/genie-demo-drawon.webm', import.meta.url);

const DEMOS = [
  { src: demoSpin, caption: '3D Spin', note: 'A full cinematic turn with real depth and lighting.' },
  { src: demoAssemble, caption: 'Assemble', note: 'Your mark builds itself together, piece by piece.' },
  { src: demoDrawOn, caption: 'Draw On', note: 'A hand-drawn reveal that traces every stroke.' },
];

const FEATURES = [
  {
    title: 'Cinematic styles',
    body: '3D spins, draw-on reveals, spray-paint splatters, and more — every style is crafted to make a flat logo feel alive.',
    icon: (
      <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9Zm4.5 2v5l4-2.5-4-2.5Z" />
    ),
  },
  {
    title: 'Transparent exports',
    body: 'Videos render with a real alpha channel, so they drop cleanly into any website, edit, stream overlay, or presentation.',
    icon: (
      <path d="M3 3h4v4H3V3Zm6 0h4v4H9V3ZM3 9h4v4H3V9Zm7.5 1.5L9 9h5v5l-1.5-1.5L10 15l-2-2 2.5-2.5Z" />
    ),
  },
  {
    title: 'Instant previews',
    body: 'Upload a flat logo file and watch styles render as free watermarked previews — pay only when you find the one you love.',
    icon: (
      <path d="M8 3c3.5 0 6 2.7 6.9 4.6a1 1 0 0 1 0 .8C14 10.3 11.5 13 8 13S2 10.3 1.1 8.4a1 1 0 0 1 0-.8C2 5.7 4.5 3 8 3Zm0 2.5A2.5 2.5 0 1 0 8 10.5 2.5 2.5 0 0 0 8 5.5Z" />
    ),
  },
];

const STEPS = [
  {
    title: 'Upload your logo',
    body: 'Any flat logo file works — no design skills or motion software needed.',
  },
  {
    title: 'Preview styles free',
    body: 'Watch your logo come to life in watermarked previews, on the house.',
  },
  {
    title: 'Unlock what you love',
    body: 'Pay once per video. No subscription, no watermark, yours forever.',
  },
];

const PLANS = [
  {
    tier: 'Previews',
    price: '$0',
    period: 'always free',
    featured: false,
    perks: [
      'Watermarked previews of every style',
      'Try as many looks as you want',
      'No card required to start',
    ],
    cta: 'Try it free',
  },
  {
    tier: 'Per video',
    price: '$7.99',
    period: 'one-time · per unlocked video',
    featured: true,
    perks: [
      'Full-quality video, no watermark',
      'Transparent-background export',
      'No subscription — pay only for what you keep',
    ],
    cta: 'Unlock a video',
  },
];

export default function BrandGenie() {
  usePageMeta(
    'BrandGenie',
    `BrandGenie by ${COMPANY.legalName} — instantly turn a logo into a cinematic animated video with 3D spins, draw-on reveals, and transparent-background exports.`
  );

  return (
    <div className="page page-brandgenie">
      {/* Hero — BrandGenie's purple-to-cyan identity */}
      <section className="gn-hero">
        <div className="gn-hero__glow" aria-hidden="true" />
        <div className="gn-hero__inner">
          <img className="gn-hero__logo" src={genieLogo} alt="" aria-hidden="true" />
          <span className="gn-hero__eyebrow">BrandGenie · Logo Animation Studio</span>
          <h1 className="gn-hero__title">
            Instantly turn your logo into a <em>cinematic video.</em>
          </h1>
          <p className="gn-hero__lead">
            No subscriptions — pay only for the videos you love.
          </p>
          <div className="gn-hero__actions">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--genie btn--lg">
              Try it free
            </a>
            <a href="#gn-demos" className="btn btn--ghost btn--lg">See it in action</a>
          </div>
          <p className="gn-hero__trust">Free previews · no card required to start</p>
        </div>
      </section>

      {/* Real output demos */}
      <section id="gn-demos" className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">All made with BrandGenie</h2>
          <p className="section-subtitle">
            Every clip below started as a flat logo file — nothing else.
          </p>
        </div>
        <div className="gn-demos">
          {DEMOS.map((d) => (
            <figure className="gn-demo" key={d.caption}>
              <div className="gn-demo__stage">
                <video src={d.src} autoPlay loop muted playsInline aria-label={`${d.caption} logo animation demo`} />
              </div>
              <figcaption>
                <span className="gn-demo__caption">{d.caption}</span>
                <span className="gn-demo__note">{d.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="home-section gn-features">
        <div className="home-section__head">
          <h2 className="section-title">Your brand, in motion</h2>
          <p className="section-subtitle">
            Cinematic quality without the studio, the software, or the timeline.
          </p>
        </div>
        <div className="cards">
          {FEATURES.map((f) => (
            <div className="card gn-card" key={f.title}>
              <div className="card__icon gn-card__icon">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{f.icon}</svg>
              </div>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">From flat file to film in three steps</h2>
        </div>
        <ol className="gn-steps">
          {STEPS.map((s, i) => (
            <li className="gn-steps__item" key={s.title}>
              <span className="gn-steps__num">{i + 1}</span>
              <h3 className="gn-steps__title">{s.title}</h3>
              <p className="gn-steps__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="home-section gn-pricing">
        <div className="home-section__head">
          <h2 className="section-title">Simple, honest pricing</h2>
          <p className="section-subtitle">No plans to compare, no renewals to remember.</p>
        </div>
        <div className="gn-plans">
          {PLANS.map((p) => (
            <div className={`gn-plan${p.featured ? ' gn-plan--featured' : ''}`} key={p.tier}>
              <span className="gn-plan__tier">{p.tier}</span>
              <div className="gn-plan__price">
                {p.price} <small>{p.period}</small>
              </div>
              <ul className="gn-plan__perks">
                {p.perks.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${p.featured ? 'btn--genie' : 'btn--ghost'}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="home-cta gn-cta">
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Give your logo the spotlight.</h2>
          <p className="home-cta__lead">
            BrandGenie is built and maintained by {COMPANY.legalName}. Preview
            your logo in motion for free, or reach out if you want to know more.
          </p>
          <div className="gn-cta__actions">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--genie btn--lg">
              Open BrandGenie
            </a>
            <Link to="/contact" className="btn btn--ghost btn--lg">Get in touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
