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
