import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import { COMPANY } from '../siteConfig';

const SERVICES = [
  {
    title: 'AI Agents',
    body: 'Production-ready conversational and voice AI agents that answer questions, book appointments, follow up on leads, and plug into the tools your team already uses.',
    icon: (
      <path d="M8 1a2 2 0 0 1 2 2v1h1.5A2.5 2.5 0 0 1 14 7.5V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7.5A2.5 2.5 0 0 1 4.5 5H6V3a2 2 0 0 1 2-2Zm-2 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    ),
  },
  {
    title: 'Web & Software Development',
    body: 'Custom websites, web apps, and business software built with modern, maintainable technology — from first prototype to a scalable production release.',
    icon: (
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9Zm5.6 2.3a.75.75 0 0 0-1.2.9L6.8 9l-1.4 2.3a.75.75 0 1 0 1.2.9l1.75-2.85a.75.75 0 0 0 0-.9L6.6 5.8Zm3.15 4.95a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z" />
    ),
  },
  {
    title: 'Cloud & Data',
    body: 'Cloud deployments, API integrations, and database solutions — including natural-language interfaces to your data — that keep your operation fast and reliable.',
    icon: (
      <path d="M4.5 13a3.5 3.5 0 0 1-.5-6.96 4 4 0 0 1 7.78-.9A3 3 0 0 1 12 13H4.5Z" />
    ),
  },
];

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: '3', label: 'Live AI agents' },
  { value: '24/7', label: 'Automated availability' },
  { value: '100%', label: 'Custom-built solutions' },
];

export default function Home() {
  usePageMeta(
    'Smart Software Solutions',
    `${COMPANY.legalName} builds AI agents, web apps, and custom software that help businesses automate work and grow.`
  );

  return (
    <div className="page page-home">
      {/* Animated hero: network graphic + floating 3D logo */}
      <Hero />

      {/* What we do */}
      <section id="what-we-do" className="home-section">
        <div className="home-section__head">
          <h2 className="section-title">What we do</h2>
          <p className="section-subtitle">
            End-to-end product development — strategy, design, engineering, and deployment.
          </p>
        </div>
        <div className="cards">
          {SERVICES.map((s) => (
            <div className="card" key={s.title}>
              <div className="card__icon">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{s.icon}</svg>
              </div>
              <h3 className="card__title">{s.title}</h3>
              <p className="card__body">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="home-section__cta">
          <Link to="/services" className="btn btn--primary">See our AI agents in action</Link>
        </div>
      </section>

      {/* Stats band */}
      <section className="home-stats">
        <div className="home-stats__inner">
          {STATS.map((s) => (
            <div className="home-stats__item" key={s.label}>
              <span className="home-stats__value">{s.value}</span>
              <span className="home-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="home-cta">
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Have a project in mind?</h2>
          <p className="home-cta__lead">
            Tell us what you&rsquo;re building and we&rsquo;ll help you get there.
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">Start a conversation</Link>
        </div>
      </section>
    </div>
  );
}
