import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import TechnologiesCarousel from '../components/TechnologiesCarousel';
import { COMPANY } from '../siteConfig';

const SERVICES = [
  {
    title: 'AI Agents',
    body: 'Production-ready conversational and voice AI agents that answer questions, book appointments, follow up on leads, and plug into the tools your team already uses.',
    icon: (
      <path d="M8 1a2 2 0 0 1 2 2v1h1.5A2.5 2.5 0 0 1 14 7.5V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7.5A2.5 2.5 0 0 1 4.5 5H6V3a2 2 0 0 1 2-2Zm-2 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    ),
    cta: { to: '/products/custom-ai-agents', label: 'See our AI agents in action' },
  },
  {
    title: 'Custom App Development',
    body: 'Custom web, mobile, and desktop applications built to fit your exact workflow — designed, engineered, and shipped from first prototype to a scalable production release.',
    icon: (
      <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Zm1.5.5v1.5h9V3.5h-9Zm0 3V13h9V6.5h-9Z" />
    ),
  },
  {
    title: 'Automated Workflows',
    body: 'Connect the tools you already use and automate the repetitive work — lead routing, notifications, data sync, and multi-step processes that run reliably in the background so your team doesn’t have to.',
    icon: (
      <path d="M9.6 1 3.2 9h3.6l-1.4 6 6.4-8H8.2l1.4-6Z" />
    ),
  },
];

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: '20+', label: 'Repositories and counting' },
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
              {s.cta && (
                <div className="card__cta">
                  <Link to={s.cta.to} className="btn btn--primary">{s.cta.label}</Link>
                </div>
              )}
            </div>
          ))}
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

      {/* Technologies carousel */}
      <TechnologiesCarousel />

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
