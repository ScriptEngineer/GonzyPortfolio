import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY } from '../siteConfig';

const VALUES = [
  {
    title: 'Craftsmanship',
    body: 'We write clean, maintainable software and treat every project like it carries our name — because it does.',
  },
  {
    title: 'Partnership',
    body: 'We work as an extension of your team, learning your business rules, your tone, and your goals.',
  },
  {
    title: 'Practical AI',
    body: 'We build AI that does real work inside real workflows — not demos that impress but never ship.',
  },
];

const EXPERIENCE = [
  {
    period: 'Jul 2021 – Jan 2026',
    role: 'Senior Web Developer',
    org: 'Trinity Software',
  },
  {
    period: 'Sep 2016 – Jun 2021',
    role: 'Web Developer',
    org: 'UT Southwestern Medical Center',
  },
  {
    period: '2013 – 2016',
    role: 'Freelance Web Developer',
    org: 'Independent',
  },
  {
    period: '2011 – 2015',
    role: 'B.A. Communication Technologies',
    org: 'University of Texas at Arlington',
  },
];

export default function About() {
  usePageMeta(
    'About',
    `${COMPANY.legalName} is a software and AI studio with 10+ years of professional development experience.`
  );

  return (
    <div className="page page-about">
      <section className="page-hero page-hero--video">
        {/* Looping Dallas skyline backdrop. Drop the file at
            static/video/dallas-skyline.(webm|mp4); a brand gradient shows until then. */}
        <video
          className="page-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/dallas-skyline.mp4" type="video/mp4" />
        </video>
        <div className="page-hero__overlay" aria-hidden="true"></div>

        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">About us</span>
          <h1 className="page-hero__title">A software studio built on a decade of experience</h1>
          <p className="page-hero__lead">
            {COMPANY.legalName} is a software and AI company founded on a simple
            idea: businesses deserve technology that actually moves work forward.
          </p>
        </div>
      </section>

      <section className="prose-section">
        <div className="prose">
          <h2 className="section-title">Our story</h2>
          <p>
            {COMPANY.shortName} started as an independent development practice in{' '}
            {COMPANY.foundedYear} and has grown into a company delivering AI agents,
            web applications, and custom software for businesses that want to work
            smarter. Over more than ten years across enterprise, healthcare, and
            freelance environments, we&rsquo;ve learned what it takes to ship software
            that people rely on every day.
          </p>
          <p>
            Today we help organizations put modern AI to work — building assistants
            that answer customers, follow up on leads, and make data easy to reach —
            alongside the web and software foundations those tools run on.
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">What we value</h2>
        </div>
        <div className="cards">
          {VALUES.map((v) => (
            <div className="card" key={v.title}>
              <h3 className="card__title">{v.title}</h3>
              <p className="card__body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-section">
        <div className="prose">
          <h2 className="section-title">Background &amp; experience</h2>
          <ul className="timeline">
            {EXPERIENCE.map((e) => (
              <li className="timeline__item" key={e.period + e.role}>
                <span className="timeline__period">{e.period}</span>
                <span className="timeline__role">{e.role}</span>
                <span className="timeline__org">{e.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Let&rsquo;s build something together</h2>
          <Link to="/contact" className="btn btn--primary btn--lg">Contact us</Link>
        </div>
      </section>
    </div>
  );
}
