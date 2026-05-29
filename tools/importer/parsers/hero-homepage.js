/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage
 * Base block: hero
 * Source: https://wknd-trendsetters.site/
 * Selector: header.section.secondary-section
 * Generated: 2026-05-28
 *
 * Source structure:
 *   header.section.secondary-section > .container > .grid-layout.tablet-1-column.grid-gap-xxl
 *     - div (content): h1.h1-heading, p.subheading, .button-group with a.button links
 *     - div (images): .grid-layout with img.cover-image elements
 *
 * Target table structure (from library example):
 *   Row 1: image(s)
 *   Row 2: heading
 *   Row 3: description
 *   Row 4: CTA button(s)
 */
export default function parse(element, { document }) {
  // Extract images from the image grid area
  const images = Array.from(element.querySelectorAll('.grid-layout.grid-gap-xs img.cover-image, .grid-layout img.cover-image'));

  // Extract heading (h1 primary, fallback to h2/h3)
  const heading = element.querySelector('h1.h1-heading, h1, h2, h3');

  // Extract description/subheading
  const description = element.querySelector('p.subheading, p');

  // Extract CTA buttons from button group
  const ctaButtons = Array.from(element.querySelectorAll('.button-group a.button, .button-group a, a.button'));

  // Build cells matching library example structure:
  // Row 1: image(s)
  // Row 2: heading
  // Row 3: description text
  // Row 4: CTA button(s)
  const cells = [];

  // Row 1: images
  if (images.length > 0) {
    cells.push(images.length === 1 ? [images[0]] : [images]);
  }

  // Row 2: heading
  if (heading) {
    cells.push([heading]);
  }

  // Row 3: description
  if (description) {
    cells.push([description]);
  }

  // Row 4: CTA buttons (all in one cell)
  if (ctaButtons.length > 0) {
    cells.push([ctaButtons]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
