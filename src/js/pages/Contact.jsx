import React, { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY, formatAddress } from '../siteConfig';

export default function Contact() {
  usePageMeta(
    'Contact',
    `Get in touch with ${COMPANY.legalName}. Email ${COMPANY.email}.`
  );

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  };

  const address = formatAddress();

  return (
    <div className="page page-contact">
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Contact</span>
          <h1 className="page-hero__title">Let&rsquo;s talk about your project</h1>
          <p className="page-hero__lead">
            Reach out and we&rsquo;ll get back to you within one business day.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-info">
          <h2 className="section-title">Get in touch</h2>
          <p className="contact-info__company">{COMPANY.legalName}</p>

          <div className="contact-info__item">
            <span className="contact-info__label">Email</span>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
          {address && (
            <div className="contact-info__item">
              <span className="contact-info__label">Address</span>
              <span>{address}</span>
            </div>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-form__field">
            <span>Name</span>
            <input type="text" value={form.name} onChange={update('name')} required />
          </label>
          <label className="contact-form__field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={update('email')} required />
          </label>
          <label className="contact-form__field">
            <span>How can we help?</span>
            <textarea rows="5" value={form.message} onChange={update('message')} required />
          </label>
          <button type="submit" className="btn btn--primary">Send message</button>
          <p className="contact-form__note">
            Submitting opens your email app addressed to {COMPANY.email}.
          </p>
        </form>
      </section>
    </div>
  );
}
