/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature. Base: cards.
 * Source: https://www.merkle.com/
 * Generated: 2026-09-07
 *
 * Library convention: 2 columns, one row per card.
 *   Cell 1: card image (mandatory)
 *   Cell 2: text content (heading + description)
 *
 * On the source page the 4 capability features are 4 sibling
 * `.container.responsivegrid.text-left` elements sharing a common parent grid
 * (there is no single wrapper element unique to the group). The block selector
 * therefore matches all 4 cards individually. To emit ONE cards block instead
 * of four one-card blocks, this parser aggregates: when invoked on the first
 * card of the group it builds a single block from every sibling card and
 * removes the remaining siblings (the import loop skips already-detached
 * elements on later iterations).
 * The DM/Scene7 transformer handles image URL conversion site-wide.
 */
export default function parse(element, { document }) {
  const SELECTOR = '.container.responsivegrid.text-left';

  // Determine the sibling group of feature cards under the shared parent.
  const parent = element.parentElement;
  const group = parent
    ? Array.from(parent.children).filter((el) => el.matches && el.matches(SELECTOR))
    : [element];

  // Only the first card in the group produces the block; later ones are removed
  // here so the import loop's detached-element guard skips them.
  if (group.length && group[0] !== element) {
    element.remove();
    return;
  }

  const cards = group.length ? group : [element];
  const cells = [];

  cards.forEach((card) => {
    // Use single, non-overlapping selectors so a card isn't matched twice.
    let imgBlock = card.querySelector('.cmp-image') || card.querySelector('.image');
    let textBlock = card.querySelector('.cmp-text') || card.querySelector('.text');

    const img = imgBlock
      ? imgBlock.querySelector('picture img, img') || imgBlock.querySelector('picture')
      : null;

    const contentCell = [];
    if (textBlock) {
      const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      const paras = Array.from(textBlock.querySelectorAll('p'));
      if (heading) contentCell.push(heading);
      paras.forEach((p) => contentCell.push(p));
      if (!contentCell.length) contentCell.push(...textBlock.childNodes);
    }

    if (img || contentCell.length) {
      cells.push([img || '', contentCell.length ? contentCell : '']);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards (feature)', cells });
  element.replaceWith(block);

  // Remove any remaining sibling cards now folded into the block.
  cards.forEach((card) => {
    if (card !== element && card.parentNode) card.remove();
  });
}
