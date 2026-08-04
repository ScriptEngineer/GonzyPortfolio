import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY } from '../siteConfig';

// NOTE: Marketing copy below is placeholder — refine with real app details,
// screenshots, and the App Store link once available.
const FEATURES = [
  {
    title: 'Stitch Anything Together',
    body: 'Combine clips, loops, and recordings from different sources into one seamless track — no studio software or steep learning curve required.',
    icon: (
      <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm1.5 3.5h5v1.5h-5V5.5Zm0 3h5V10h-5V8.5Z" />
    ),
  },
  {
    title: 'Edit With Precision',
    body: 'Trim, split, layer, and rearrange audio on a simple timeline built for touch. Fine-grained control without the clutter.',
    icon: (
      <path d="M9.6 1 3.2 9h3.6l-1.4 6 6.4-8H8.2l1.4-6Z" />
    ),
  },
  {
    title: 'Share Instantly',
    body: 'Export your creation in standard formats and share it anywhere — messages, social, or straight into your other projects.',
    icon: (
      <path d="M8 1a2 2 0 0 1 2 2v1h1.5A2.5 2.5 0 0 1 14 6.5V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5A2.5 2.5 0 0 1 4.5 4H6V3a2 2 0 0 1 2-2Z" />
    ),
  },
];

export default function FrankensteinAudio() {
  usePageMeta(
    'Frankenstein Audio',
    `Frankenstein Audio by ${COMPANY.legalName} — stitch, edit, and share audio creations from your phone.`
  );

  return (
    <div className="page page-frankenstein">
      <div className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Frankenstein Audio</span>
          <h1 className="page-hero__title">Bring Your Audio Creations to Life</h1>
          <p className="page-hero__lead">
            Frankenstein Audio is our mobile app for stitching sounds together —
            record, chop, layer, and combine audio into something entirely new,
            right from your phone.
          </p>
        </div>
      </div>

      <section className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">What it does</h2>
          <p className="section-subtitle">
            A focused set of tools that make audio editing fast, fun, and portable.
          </p>
        </div>
        <div className="cards">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="card__icon">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{f.icon}</svg>
              </div>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Want to know more?</h2>
          <p className="home-cta__lead">
            Reach out for early access, questions, or feedback on Frankenstein Audio.
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">Get in touch</Link>
        </div>
      </section>
    </div>
  );
}
