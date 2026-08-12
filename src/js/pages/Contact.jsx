import React, { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { COMPANY, formatAddress } from '../siteConfig';

export default function Contact() {
  usePageMeta(
    'Contact',
    `Get in touch with ${COMPANY.legalName}. Email ${COMPANY.email}.`
  );

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // Last-resort fallback: open the visitor's mail app pre-addressed to us.
  const openMailApp = () => {
    const subject = encodeURIComponent(`Website inquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        openMailApp();
      }
    } catch (err) {
      setStatus('error');
      openMailApp();
    }
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
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && (
            <p className="contact-form__note contact-form__note--success">
              Message sent — we&rsquo;ll get back to you within one business day.
            </p>
          )}
          {status === 'error' && (
            <p className="contact-form__note">
              We couldn&rsquo;t send your message directly, so we opened your email app
              addressed to {COMPANY.email} instead.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
