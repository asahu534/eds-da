/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article
 * Base block: cards
 * Source: https://wknd-trendsetters.site/
 * Selector: .secondary-section .grid-layout.desktop-4-column.grid-gap-md
 * Generated: 2026-05-28
 *
 * Source structure:
 *   div.grid-layout > a.article-card.card-link (repeated)
 *     div.article-card-image > img.cover-image
 *     div.article-card-body > div.article-card-meta > span.tag + span.paragraph-sm
 *     div.article-card-body > h3.h4-heading
 *
 * Target table (from library example):
 *   | Cards |
 *   | image | title, tag, date |
 *   (one row per card)
 */
export default function parse(element, { document }) {
  // Select only the direct child anchor elements that are article cards
  const cards = element.querySelectorAll(':scope > a.article-card');

  const cells = [];

  cards.forEach((card) => {
    // Column 1: Image
    const image = card.querySelector('.article-card-image img');

    // Column 2: Title + metadata (tag and date)
    const heading = card.querySelector('h3.h4-heading');
    const tag = card.querySelector('.article-card-meta .tag');
    const date = card.querySelector('.article-card-meta .paragraph-sm');

    // Build the content cell with linked title and metadata
    const contentCell = [];

    // Create a link with the card href wrapping the title text
    const href = card.getAttribute('href');
    if (heading && href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading.textContent.trim();
      contentCell.push(link);
    } else if (heading) {
      const bold = document.createElement('strong');
      bold.textContent = heading.textContent.trim();
      contentCell.push(bold);
    }

    // Build tag - date metadata text
    const metaParts = [];
    if (tag) metaParts.push(tag.textContent.trim());
    if (date) metaParts.push(date.textContent.trim());
    if (metaParts.length > 0) {
      const metaText = document.createTextNode(metaParts.join(' - '));
      contentCell.push(metaText);
    }

    // Row: [image, content]
    const imageCell = image ? [image] : [''];
    cells.push([imageCell, contentCell.length ? contentCell : ['']]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
