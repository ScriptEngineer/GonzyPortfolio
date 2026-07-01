import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY, formatAddress } from '../siteConfig';

const EFFECTIVE_DATE = 'July 1, 2026';

export default function Privacy() {
  usePageMeta('Privacy Policy', `Privacy Policy for ${COMPANY.legalName}.`);
  const address = formatAddress();

  return (
    <div className="page page-privacy">
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Legal</span>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__lead">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="prose-section">
        <div className="prose">
          <p>
            This Privacy Policy describes how {COMPANY.legalName} (&ldquo;{COMPANY.shortName},&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
            information when you visit {COMPANY.domain} or use our services.
          </p>

          <h2 className="section-title">Information we collect</h2>
          <p>
            We collect information you provide directly to us — such as your name,
            email address, phone number, and any message content — when you contact
            us, request a demo, or interact with our AI agents. We may also collect
            limited technical information automatically, such as browser type and
            general usage data, to operate and improve the site.
          </p>

          <h2 className="section-title">How we use information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services;</li>
            <li>Operate, maintain, and improve our website and products;</li>
            <li>Communicate with you about your project or request; and</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="section-title">Sharing of information</h2>
          <p>
            We do not sell your personal information. We may share information with
            trusted service providers who help us operate our business (for example,
            hosting and communication tools), and only to the extent necessary to
            provide those services, or when required by law.
          </p>

          <h2 className="section-title">Data retention &amp; security</h2>
          <p>
            We retain personal information only as long as needed for the purposes
            described here, and we use reasonable administrative and technical
            safeguards to protect it. No method of transmission over the internet is
            completely secure, however, and we cannot guarantee absolute security.
          </p>

          <h2 className="section-title">Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal
            information by contacting us at the address below. We will respond in
            accordance with applicable law.
          </p>

          <h2 className="section-title">Contact us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:
          </p>
          <p>
            {COMPANY.legalName}<br />
            {address && (<>{address}<br /></>)}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
            <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phoneDisplay}</a>
          </p>

          <p className="prose__muted">
            This policy may be updated from time to time. Material changes will be
            reflected by updating the effective date above.
          </p>
        </div>
      </section>
    </div>
  );
}
