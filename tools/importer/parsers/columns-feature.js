/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Source: https://wknd-trendsetters.site/
 * Selector: main > section:nth-child(2) .grid-layout.tablet-1-column.grid-gap-lg
 * Generated: 2026-05-28
 *
 * Source structure:
 *   .grid-layout.tablet-1-column.grid-gap-lg
 *     > div (image column: img.cover-image)
 *     > div (text column: breadcrumbs, h2, author/date metadata)
 *
 * Target: Columns block with two cells per row (left: image, right: text content)
 */
export default function parse(element, { document }) {
  // Extract the two column containers (direct children divs of the grid layout)
  const columns = element.querySelectorAll(':scope > div');

  // Left column: image
  const leftColumn = columns[0];
  const image = leftColumn ? leftColumn.querySelector('img') : null;

  // Right column: text content (breadcrumbs, heading, metadata)
  const rightColumn = columns[1];

  // Build left cell content
  const leftCell = [];
  if (image) {
    leftCell.push(image);
  }

  // Build right cell content
  const rightCell = [];
  if (rightColumn) {
    // Breadcrumbs
    const breadcrumbs = rightColumn.querySelector('.breadcrumbs');
    if (breadcrumbs) {
      rightCell.push(breadcrumbs);
    }

    // Heading (h2 or fallback to h1, h3)
    const heading = rightColumn.querySelector('h2, h1, h3, [class*="heading"]');
    if (heading) {
      rightCell.push(heading);
    }

    // Author and date metadata (the remaining div after breadcrumbs and heading)
    const metaDivs = rightColumn.querySelectorAll(':scope > div:not(.breadcrumbs)');
    metaDivs.forEach((metaDiv) => {
      rightCell.push(metaDiv);
    });
  }

  // Build cells array: single row with two cells (left image, right text)
  const cells = [
    [leftCell.length ? leftCell : '', rightCell.length ? rightCell : ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
