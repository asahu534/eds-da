import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * image-compare block
 * Renders the SAME image two ways to demonstrate delivery differences:
 *   - Approach A: EDS Media Bus optimization (createOptimizedPicture)
 *     → webp/avif renditions, optimize=medium, served same-origin
 *   - Approach B: external delivery URL (e.g. Dynamic Media) with raw params
 *     → served from the asset's own CDN, transformed via URL params
 *
 * Author provides, per row:
 *   row 1: the image URL (used for both approaches)
 *   row 2 (optional): alt text
 */
export default function decorate(block) {
  const rows = [...block.children];
  const src = rows[0]?.textContent.trim();
  const alt = rows[1]?.textContent.trim() || '';

  block.textContent = '';

  if (!src) {
    block.innerHTML = '<p class="image-compare-error">No image URL provided.</p>';
    return;
  }

  // --- Approach A: EDS Media Bus optimized picture ---
  const colA = document.createElement('div');
  colA.className = 'image-compare-col';
  const labelA = document.createElement('h3');
  labelA.textContent = 'Approach A — EDS Media Bus';
  const noteA = document.createElement('p');
  noteA.className = 'image-compare-note';
  noteA.textContent = 'Optimized via createOptimizedPicture (webp, optimize=medium, same-origin)';
  const pictureA = createOptimizedPicture(src, alt, false);
  colA.append(labelA, noteA, pictureA);

  // --- Approach B: external delivery URL with raw transformation params ---
  const colB = document.createElement('div');
  colB.className = 'image-compare-col';
  const labelB = document.createElement('h3');
  labelB.textContent = 'Approach B — External delivery URL';
  const noteB = document.createElement('p');
  noteB.className = 'image-compare-note';
  noteB.textContent = 'Referenced from source CDN, transformed via URL params (width, quality)';

  const buildSrc = (width) => {
    const u = !src.startsWith('http') ? new URL(src, window.location.href) : new URL(src);
    u.searchParams.set('width', width);
    u.searchParams.set('quality', '80');
    return u.toString();
  };

  const pictureB = document.createElement('picture');
  const sourceB = document.createElement('source');
  sourceB.media = '(min-width: 600px)';
  sourceB.srcset = buildSrc(2000);
  pictureB.append(sourceB);
  const imgB = document.createElement('img');
  imgB.src = buildSrc(750);
  imgB.alt = alt;
  imgB.loading = 'lazy';
  pictureB.append(imgB);
  colB.append(labelB, noteB, pictureB);

  block.append(colA, colB);
}
