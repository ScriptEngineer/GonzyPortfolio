import { useEffect } from 'react';
import { COMPANY } from '../siteConfig';

// Sets the document <title> and meta description for a page.
// Keeping real, per-page titles/descriptions helps reviewers and crawlers
// see meaningful content on a client-rendered SPA.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${COMPANY.shortName}`
      : COMPANY.shortName;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
