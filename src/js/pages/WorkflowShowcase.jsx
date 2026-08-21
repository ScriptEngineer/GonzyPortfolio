import React, { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';

// Hidden test page for n8n workflows. Reachable at /workflow-showcase but
// intentionally left out of NAV_LINKS so it never appears in site navigation.
// Submissions go to /api/workflow-showcase, which proxies them to the n8n
// webhook configured in .env (N8N_WEBHOOK_URL_SHOWCASE_PRO/DEV).

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  quantity: 1,
  eventDate: '',
  category: 'design',
  priority: 'medium',
  channels: [],
  budget: 50,
  subscribe: false,
  notes: '',
};

const CATEGORY_OPTIONS = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'automation', label: 'Automation' },
  { value: 'other', label: 'Other' },
];

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];
const CHANNEL_OPTIONS = ['Email', 'SMS', 'Slack', 'Discord'];

export default function WorkflowShowcase() {
  usePageMeta('Workflow Showcase', 'Internal test page for n8n workflows.');

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [response, setResponse] = useState(null);

  const update = (field) => (e) => {
    const { type, value, checked } = e.target;
    setForm({ ...form, [field]: type === 'checkbox' ? checked : value });
  };

  const toggleChannel = (channel) => () => {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setResponse(null);
    try {
      const res = await fetch('/api/workflow-showcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          budget: Number(form.budget),
          submittedAt: new Date().toISOString(),
          source: 'workflow-showcase',
        }),
      });
      const text = await res.text();
      let body = text;
      try { body = JSON.stringify(JSON.parse(text), null, 2); } catch { /* keep raw text */ }
      setResponse({ status: `${res.status} ${res.statusText}`.trim(), body });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (err) {
      setResponse({ status: 'Request failed', body: String(err) });
      setStatus('error');
    }
  };

  return (
    <div className="page page-workflow-showcase">
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Internal</span>
          <h1 className="page-hero__title">Workflow showcase</h1>
          <p className="page-hero__lead">
            Test form for n8n workflows. Submissions are sent as JSON to the
            configured workflow webhook.
          </p>
        </div>
      </section>

      <section className="workflow-showcase">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="workflow-showcase__grid">
            <label className="contact-form__field">
              <span>Full name (text)</span>
              <input type="text" value={form.fullName} onChange={update('fullName')} required />
            </label>
            <label className="contact-form__field">
              <span>Email (email)</span>
              <input type="email" value={form.email} onChange={update('email')} required />
            </label>
            <label className="contact-form__field">
              <span>Phone (tel)</span>
              <input type="tel" value={form.phone} onChange={update('phone')} />
            </label>
            <label className="contact-form__field">
              <span>Quantity (number)</span>
              <input type="number" min="1" max="100" value={form.quantity} onChange={update('quantity')} />
            </label>
            <label className="contact-form__field">
              <span>Event date (date)</span>
              <input type="date" value={form.eventDate} onChange={update('eventDate')} />
            </label>
            <label className="contact-form__field">
              <span>Category (select)</span>
              <select value={form.category} onChange={update('category')}>
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="contact-form__field workflow-showcase__options">
            <legend>Priority (radio)</legend>
            {PRIORITY_OPTIONS.map((level) => (
              <label key={level} className="workflow-showcase__option">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={form.priority === level}
                  onChange={update('priority')}
                />
                <span>{level}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="contact-form__field workflow-showcase__options">
            <legend>Notification channels (checkboxes)</legend>
            {CHANNEL_OPTIONS.map((channel) => (
              <label key={channel} className="workflow-showcase__option">
                <input
                  type="checkbox"
                  checked={form.channels.includes(channel)}
                  onChange={toggleChannel(channel)}
                />
                <span>{channel}</span>
              </label>
            ))}
          </fieldset>

          <label className="contact-form__field">
            <span>Budget (range) — ${form.budget}k</span>
            <input type="range" min="0" max="200" step="5" value={form.budget} onChange={update('budget')} />
          </label>

          <label className="workflow-showcase__option">
            <input type="checkbox" checked={form.subscribe} onChange={update('subscribe')} />
            <span>Subscribe to updates (boolean)</span>
          </label>

          <label className="contact-form__field">
            <span>Notes (textarea)</span>
            <textarea rows="4" value={form.notes} onChange={update('notes')} />
          </label>

          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send to workflow'}
          </button>

          {response && (
            <div className={`workflow-showcase__response ${status === 'error' ? 'is-error' : ''}`}>
              <span className="contact-form__note">Response: {response.status}</span>
              {response.body && <pre>{response.body}</pre>}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
