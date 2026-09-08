/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.merkle.com/
 * Generated: 2026-09-07
 *
 * Library convention: 2 columns, one row per slide.
 *   Cell 1: slide image (mandatory)
 *   Cell 2: text content (pretitle, title, description, CTAs)
 * The Dynamic Media/Scene7 transformer handles image URL conversion site-wide,
 * so this parser emits standard <img> markup.
 */
export default function parse(element, { document }) {
  // Each carousel slide is a .cmp-carousel__item
  const slides = element.querySelectorAll('.cmp-carousel__item');
  const cells = [];

  slides.forEach((slide) => {
    // Image (first cell) — prefer <img> so the DM transformer handles the src
    const img = slide.querySelector('.cmp-teaser__image img, .cmp-image img, picture img, img');

    // Text content (second cell)
    const contentCell = [];
    const pretitle = slide.querySelector('.cmp-teaser__pretitle');
    const title = slide.querySelector('.cmp-teaser__title, h1, h2, h3');
    const description = slide.querySelector('.cmp-teaser__description');
    const ctaLinks = Array.from(slide.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'));

    if (pretitle) contentCell.push(pretitle);
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    ctaLinks.forEach((cta) => contentCell.push(cta));

    // Only add a slide row when it has real content (skip empty/nav-only items)
    if (img || contentCell.length) {
      cells.push([img || '', contentCell.length ? contentCell : '']);
    }
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
