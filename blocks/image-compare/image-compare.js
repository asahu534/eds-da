import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * image-compare block
 * Renders two images to demonstrate delivery differences:
 *   - Approach A: EDS Media Bus optimization (createOptimizedPicture)
 *     → webp renditions, optimize=medium, served same-origin
 *   - Approach B: external delivery URL (e.g. Dynamic Media / CDN) with raw params
 *     → served from the asset's own CDN, transformed via URL params
 *
 * Author provides, per row:
 *   row 1: Media Bus image URL (Approach A)
 *   row 2: external delivery / Dynamic Media URL (Approach B)
 *   row 3 (optional): alt text
 */
export default function decorate(block) {
  const rows = [...block.children];
  const mediaBusSrc = rows[0]?.textContent.trim();
  const externalSrc = rows[1]?.textContent.trim();
  const alt = rows[2]?.textContent.trim() || '';

  block.textContent = '';

  if (!mediaBusSrc || !externalSrc) {
    block.innerHTML = '<p class="image-compare-error">Both a Media Bus URL and an external delivery URL are required.</p>';
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
  const pictureA = createOptimizedPicture(mediaBusSrc, alt, false);
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
    const u = !externalSrc.startsWith('http')
      ? new URL(externalSrc, window.location.href)
      : new URL(externalSrc);
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
