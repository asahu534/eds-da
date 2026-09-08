/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-featured. Base: cards.
 * Source: https://www.merkle.com/
 * Generated: 2026-09-07
 *
 * Library convention: 2 columns, one row per card.
 *   Cell 1: card image (mandatory)
 *   Cell 2: text content (pretitle, title, CTA link)
 * Each source card is wrapped in an anchor (.mer-clickabkle-wrapper) whose href is
 * the card's destination; the visible CTA text lives in a .mer-link-text span, so
 * we rebuild a real link. The DM/Scene7 transformer handles image URL conversion.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.cmp-list__item, li.cmp-list__item');
  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('.cmp-teaser__image img, .cmp-image img, picture img, img');

    const contentCell = [];
    const pretitle = card.querySelector('.cmp-teaser__pretitle');
    const title = card.querySelector('.cmp-teaser__title, h2, h3, h4');
    if (pretitle) contentCell.push(pretitle);
    if (title) contentCell.push(title);

    // Rebuild the CTA as a real link: href from the wrapping anchor, text from the link-text span
    const wrapAnchor = card.querySelector('a.mer-clickabkle-wrapper, a[href]');
    const linkText = card.querySelector('.mer-link-text, .mer-teaser__action-container span');
    if (wrapAnchor && wrapAnchor.getAttribute('href')) {
      const cta = document.createElement('a');
      cta.setAttribute('href', wrapAnchor.getAttribute('href'));
      cta.textContent = (linkText && linkText.textContent.trim()) || (title && title.textContent.trim()) || 'Learn more';
      contentCell.push(cta);
    }

    if (img || contentCell.length) {
      cells.push([img || '', contentCell.length ? contentCell : '']);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards (featured)', cells });
  element.replaceWith(block);
}
