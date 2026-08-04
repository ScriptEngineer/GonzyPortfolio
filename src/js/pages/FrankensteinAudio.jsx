import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY } from '../siteConfig';

const APP_URL = 'https://frankensteinaudio.pro/';
const appLogo = new URL('/img/frankenstein-logo.png', import.meta.url);
const studioShot = new URL('/img/landing-shot.webp', import.meta.url);

const FEATURES = [
  {
    title: 'Studio-grade stem separation',
    body: 'Every upload is restored and split into vocals, instrumental, bass, and drums with state-of-the-art AI separation — each part becomes a tile you can drop into any mix.',
    icon: (
      <path d="M8 1.2 15 5 8 8.8 1 5 8 1.2Zm-4.6 6L8 9.9l4.6-2.7 1.9 1L8 12 1.5 8.2l1.9-1Zm0 3.2L8 13.1l4.6-2.7 1.9 1L8 15.2l-6.5-3.8 1.9-1Z" />
    ),
  },
  {
    title: 'Smart tools that stay on beat',
    body: 'Magic fill picks the stems that best back your vocal — ranked by key, tempo, and groove. Distribute places verses where they fit. Gap fill writes in matching lines. Everything lands on the grid.',
    icon: (
      <path d="M9 1l1.2 3.1L13.3 5 10.2 6.2 9 9.3 7.8 6.2 4.7 5l3.1-.9L9 1ZM3.5 8.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Zm9 2.5.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" />
    ),
  },
  {
    title: 'Create, then publish',
    body: 'Generate brand-new AI beats matched to your arrangement. Export your mix as MP3, WAV, or a YouTube-ready video with beat-synced animated visuals.',
    icon: (
      <path d="M8 1.5a1 1 0 0 1 .7.3l3.5 3.5-1.4 1.4L9 4.9V10H7V4.9L5.2 6.7 3.8 5.3 7.3 1.8a1 1 0 0 1 .7-.3ZM2 9h2v3.5h8V9h2v4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13V9Z" />
    ),
  },
];

const STEPS = [
  {
    title: 'Start with what you like',
    body: "Doesn't matter if it's your verse, an old instrumental, or a beat you love.",
  },
  {
    title: 'Find what works',
    body: 'Find matches for your beat, instrument, or verse flawlessly.',
  },
  {
    title: 'Let it fit',
    body: 'Key, tempo, tuning, and downbeats align automatically.',
  },
  {
    title: 'Export',
    body: 'MP3, WAV, or a video with beat-synced animation.',
  },
];

const HIGHLIGHTS = [
  { value: '4', label: 'Stems from every song — vocals, instrumental, bass, drums' },
  { value: '0', label: 'Musical training required to build a full track' },
  { value: '100%', label: 'In your browser — nothing to install' },
  { value: '3', label: 'Free songs to start, no card required' },
];

const PLANS = [
  {
    tier: 'Free',
    price: '$0',
    period: 'forever',
    featured: false,
    perks: [
      'Full mixing studio',
      '3 songs in your library',
      '2 exports included',
      'AI stem separation',
    ],
    cta: 'Start free',
  },
  {
    tier: 'Pro',
    price: '$9.99',
    period: '/month · or $99.99/year',
    featured: true,
    perks: [
      'Unlimited exports, clean videos',
      'Magic fill, distribute & gap fill',
      'All stem refinements',
      'AI beat generation',
    ],
    cta: 'Go Pro',
  },
];

// CSS-only equalizer strip — bar heights are set here, animation lives in scss.
// A wide symmetric spread so the bars appear to radiate from behind the laptop.
const EQ_BARS = Array.from({ length: 61 }, (_, i) => {
  const t = i / 60;
  return Math.round(16 + 58 * Math.abs(Math.sin(t * Math.PI * 3)) * Math.sin(t * Math.PI));
});

export default function FrankensteinAudio() {
  usePageMeta(
    'Frankenstein Audio',
    `Frankenstein Audio by ${COMPANY.legalName} — a browser studio that splits songs into stems and rebuilds them into new mixes, auto-matched in key, tempo, and groove.`
  );

  return (
    <div className="page page-frankenstein">
      {/* Hero — the app's gold-on-black identity */}
      <section className="fk-hero">
        <div className="fk-hero__glow" aria-hidden="true" />
        <div className="fk-hero__inner">
          <img className="fk-hero__logo" src={appLogo} alt="" aria-hidden="true" />
          <span className="fk-hero__eyebrow">Frankenstein Audio · AI Stem Studio</span>
          <h1 className="fk-hero__title">
            Making music has never been <em>this easy.</em>
          </h1>
          <p className="fk-hero__lead">
            A full music studio in your browser. Upload the songs you love, split
            them into stems, and stitch the parts into something entirely new —
            auto-matched in key, tempo, and groove.
          </p>
          <div className="fk-hero__actions">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--lg">
              Launch the app
            </a>
            <a href="#fk-features" className="btn btn--ghost btn--lg">Explore features</a>
          </div>
          <p className="fk-hero__trust">Free account · 3 songs · no card required</p>
        </div>
        <div className="fk-eq" aria-hidden="true">
          {EQ_BARS.map((h, i) => (
            <span key={i} style={{ '--h': `${h}px`, '--d': `${(i % 7) * 0.14}s` }} />
          ))}
        </div>
      </section>

      {/* The real studio, framed in a laptop */}
      <section className="fk-stage">
        <div className="fk-laptop">
          <div className="fk-laptop__lid">
            <span className="fk-laptop__cam" />
            <div className="fk-laptop__screen">
              <img
                src={studioShot}
                alt="The Frankenstein Audio studio: a library of analyzed songs with BPM and key, above a multi-lane timeline mixing vocal, instrumental, bass, and drum stems"
              />
            </div>
          </div>
          <div className="fk-laptop__deck" />
        </div>
        <p className="fk-stage__caption">
          The studio — real songs analyzed by BPM and key, their stems stacked
          into a brand-new arrangement.
        </p>
      </section>

      {/* Features */}
      <section id="fk-features" className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">Your ideas become full tracks</h2>
          <p className="section-subtitle">
            You don&rsquo;t need to know how to play to make great music.
          </p>
        </div>
        <div className="cards">
          {FEATURES.map((f) => (
            <div className="card fk-card" key={f.title}>
              <div className="card__icon fk-card__icon">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{f.icon}</svg>
              </div>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights band */}
      <section className="fk-stats">
        <div className="fk-stats__inner">
          {HIGHLIGHTS.map((s) => (
            <div className="fk-stats__item" key={s.label}>
              <span className="fk-stats__value">{s.value}</span>
              <span className="fk-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">From songs to your mix in four steps</h2>
        </div>
        <ol className="fk-steps">
          {STEPS.map((s, i) => (
            <li className="fk-steps__item" key={s.title}>
              <span className="fk-steps__num">{i + 1}</span>
              <h3 className="fk-steps__title">{s.title}</h3>
              <p className="fk-steps__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="home-section fk-pricing">
        <div className="home-section__head">
          <h2 className="section-title">Start free. Go Pro when you&rsquo;re hooked.</h2>
        </div>
        <div className="fk-plans">
          {PLANS.map((p) => (
            <div className={`fk-plan${p.featured ? ' fk-plan--featured' : ''}`} key={p.tier}>
              {p.featured && <span className="fk-plan__badge">Most popular</span>}
              <span className="fk-plan__tier">{p.tier}</span>
              <div className="fk-plan__price">
                {p.price} <small>{p.period}</small>
              </div>
              <ul className="fk-plan__perks">
                {p.perks.map((perk) => <li key={perk}>{perk}</li>)}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${p.featured ? 'btn--gold' : 'btn--ghost'}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="home-cta fk-cta">
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Your next mix is three songs away.</h2>
          <p className="home-cta__lead">
            Frankenstein Audio is built and maintained by {COMPANY.legalName}.
            Try it free, or reach out if you want to know more.
          </p>
          <div className="fk-cta__actions">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--lg">
              Open Frankenstein Audio
            </a>
            <Link to="/contact" className="btn btn--ghost btn--lg">Get in touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
