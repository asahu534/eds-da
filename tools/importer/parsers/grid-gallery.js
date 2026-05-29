/* eslint-disable */
/* global WebImporter */

/**
 * Parser for grid-gallery
 * Base block: grid
 * Source: https://wknd-trendsetters.site/
 * Selector: .secondary-section .grid-layout.desktop-4-column.grid-gap-sm
 * Generated: 2026-05-28
 *
 * Source structure: div.grid-layout containing multiple div.utility-aspect-1x1 children,
 * each holding an img.cover-image. Images are displayed in a 4-column grid.
 *
 * Target structure (from library example): Grid block with rows of 4 image cells each.
 */
export default function parse(element, { document }) {
  // Extract all images from grid items
  const images = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1 img.cover-image, :scope > div img'));

  // Build cells: group images into rows of 4 (matching desktop-4-column layout)
  const columnsPerRow = 4;
  const cells = [];

  for (let i = 0; i < images.length; i += columnsPerRow) {
    const row = [];
    for (let j = i; j < i + columnsPerRow && j < images.length; j += 1) {
      row.push(images[j]);
    }
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'grid-gallery', cells });
  element.replaceWith(block);
}
