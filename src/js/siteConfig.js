// Central business information for the whole site.
// NOTE: The values marked PLACEHOLDER must match your legal / D-U-N-S records
// exactly, because Apple verifies them during Developer Program enrollment.
// Update these once and every page + the footer picks them up automatically.

export const COMPANY = {
  // --- Identity -----------------------------------------------------------
  legalName: 'Gonzy Designs LLC',      // PLACEHOLDER — confirm exact registered name
  shortName: 'Gonzy Designs',
  tagline: 'Smart software solutions.',
  foundedYear: 2013,

  // --- Contact ------------------------------------------------------------
  email: 'gonzydesigns@gmail.com',
  phoneDisplay: '(817) 286-5319',
  phoneHref: '+18172865319',

  // --- Address (as registered) -------------------------------------------
  address: {
    line1: '',                         // PLACEHOLDER — street address
    line2: '',
    city: 'Dallas',                    // PLACEHOLDER
    state: 'TX',                       // PLACEHOLDER
    zip: '',                           // PLACEHOLDER
    country: 'USA',
  },

  // --- Web ----------------------------------------------------------------
  domain: 'gonzydesigns.com',          // PLACEHOLDER — must be associated with the LLC
  url: 'https://gonzydesigns.com',     // PLACEHOLDER

  // --- Social (optional) --------------------------------------------------
  social: {
    github: 'https://github.com/ScriptEngineer',
  },
};

// Convenience: single-line formatted address (skips empty parts).
export function formatAddress(a = COMPANY.address) {
  const parts = [
    a.line1,
    a.line2,
    [a.city, a.state].filter(Boolean).join(', '),
    a.zip,
    a.country,
  ].filter(Boolean);
  return parts.join(' · ');
}

// Primary navigation used by the header and footer.
// Items with `children` render as a dropdown in the header and are
// flattened into individual links in the footer.
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    label: 'Products',
    children: [
      { to: '/products/frankenstein-audio', label: 'Frankenstein Audio' },
      { to: '/products/brandgenie', label: 'BrandGenie' },
      { to: '/products/custom-ai-agents', label: 'Custom AI Agents' },
    ],
  },
];
