/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner
 * Base block: hero
 * Source: https://wknd-trendsetters.site/
 * Selector: section.section.inverse-section
 * Generated: 2026-05-28
 *
 * Source structure:
 *   section.inverse-section > .container > .grid-layout > div
 *     img.cover-image (background image)
 *     .card-body.utility-text-on-overlay
 *       h2.h1-heading (heading)
 *       p.subheading (description)
 *       .button-group > a.button (CTA links)
 *
 * Target table structure (from block library):
 *   Row 1: Background image
 *   Row 2: Heading
 *   Row 3: Description text
 *   Row 4: CTA button(s)
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');

  // Extract heading from card-body overlay content
  const heading = element.querySelector('.card-body h2, .card-body h1, .utility-text-on-overlay h2, .utility-text-on-overlay h1, h2.h1-heading');

  // Extract description paragraph
  const description = element.querySelector('.card-body p.subheading, .card-body p, .utility-text-on-overlay p.subheading, .utility-text-on-overlay p');

  // Extract CTA buttons
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, .card-body a.button, .utility-text-on-overlay a.button'));

  // Build cells array matching block library table structure
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading
  if (heading) {
    cells.push([heading]);
  }

  // Row 3: Description
  if (description) {
    cells.push([description]);
  }

  // Row 4: CTA button(s)
  if (ctaLinks.length > 0) {
    cells.push([ctaLinks]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
