/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-cases. Base: carousel.
 * Source: https://www.merkle.com/
 * Generated: 2026-09-07
 *
 * Library convention: 2 columns, one row per slide.
 *   Cell 1: slide image (mandatory)
 *   Cell 2: text content (pretitle, title, CTA link)
 * Each source slide is a .cmp-list__item case-study card wrapped in an anchor
 * (.mer-clickabkle-wrapper) whose href is the destination; the visible CTA text
 * lives in a .mer-link-text span, so we rebuild a real link.
 * The DM/Scene7 transformer handles image URL conversion site-wide.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.cmp-list__item, li.cmp-list__item');
  const cells = [];

  // Source lays this block out in two columns: a headline ("Our work in action")
  // in a narrow left column and the case-study carousel on the right. Capture the
  // headline as a leading single-cell row so the block can rebuild that layout.
  const headline = element.querySelector('.mer-lc-headline, h2.headline2-type, h2');
  if (headline) {
    const h = document.createElement('h2');
    h.textContent = headline.textContent.trim();
    cells.push([h]);
  }

  slides.forEach((slide) => {
    const img = slide.querySelector('.cmp-teaser__image img, .cmp-image img, picture img, img');

    const contentCell = [];
    const pretitle = slide.querySelector('.cmp-teaser__pretitle');
    const title = slide.querySelector('.cmp-teaser__title, h2, h3, h4');
    if (pretitle) contentCell.push(pretitle);
    if (title) contentCell.push(title);

    // Rebuild the CTA as a real link: href from the wrapping anchor, text from the link-text span
    const wrapAnchor = slide.querySelector('a.mer-clickabkle-wrapper, a[href]');
    const linkText = slide.querySelector('.mer-link-text, .mer-teaser__action-container span');
    if (wrapAnchor && wrapAnchor.getAttribute('href')) {
      const cta = document.createElement('a');
      cta.setAttribute('href', wrapAnchor.getAttribute('href'));
      cta.textContent = (linkText && linkText.textContent.trim()) || (title && title.textContent.trim()) || 'Read case';
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-cases', cells });
  element.replaceWith(block);
}
