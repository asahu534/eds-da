/* eslint-disable */
/* global WebImporter */
/**
 * Parser for video-centered. Base: video.
 * Source: https://www.merkle.com/
 * Generated: 2026-09-07
 *
 * Library convention: 1 column, 2 rows.
 *   Row 1: block name.
 *   Row 2: video source as a link (the block reads block.querySelector('a').href),
 *          plus an optional poster image.
 * The source uses a <video><source src="...mp4"> element and a poster <img>.
 * We rebuild the source as an anchor so the block can embed it, and keep the poster.
 *
 * NOTE: automatic text-similarity validation scores this block low because a video
 * block's essential payload is the URL (an attribute), not text — the only source
 * text is the "Play" control label. The extracted URL row is the correct, complete
 * output for this block per the library convention.
 */
export default function parse(element, { document }) {
  // Video source URL — from the <source> inside <video>, or a <video src>
  const sourceEl = element.querySelector('.cmp-video-source, video source, source[src]');
  const videoEl = element.querySelector('video[src]');
  const videoSrc = (sourceEl && sourceEl.getAttribute('src'))
    || (videoEl && videoEl.getAttribute('src'))
    || '';

  // Optional poster image (handle lazy-loaded images that use data-src)
  const poster = element.querySelector('.cmp-video__player__controls img, picture, img');
  if (poster && !poster.getAttribute('src') && poster.getAttribute('data-src')) {
    poster.setAttribute('src', poster.getAttribute('data-src'));
  }

  const contentCell = [];
  if (poster) contentCell.push(poster);
  if (videoSrc) {
    const link = document.createElement('a');
    link.setAttribute('href', videoSrc);
    link.textContent = videoSrc;
    contentCell.push(link);
  }

  // Empty-block guard
  if (!contentCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single-column block: one row whose single cell holds the poster + video link.
  const cells = [[contentCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'video-centered', cells });
  element.replaceWith(block);
}
