import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Variant: `feature` uses transparent Scene7 PNG icons (fmt=png-alpha). The DM
  // auto-block / createOptimizedPicture would re-render them as opaque webp/jpg,
  // putting a white box behind each shape on the dark section — so for that
  // variant we keep the original <picture> and just restore fmt=png-alpha.
  const isFeature = block.classList.contains('feature');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });

  if (isFeature) {
    ul.querySelectorAll('picture').forEach((picture) => {
      picture.querySelectorAll('source').forEach((source) => {
        if (/fmt=(webp|jpe?g)/i.test(source.srcset)) {
          source.type = 'image/png';
          source.srcset = source.srcset.replace(/fmt=(webp|jpe?g)/gi, 'fmt=png-alpha');
        }
      });
      const img = picture.querySelector('img');
      if (img) img.src = img.src.replace(/fmt=(webp|jpe?g)/gi, 'fmt=png-alpha');
    });
  } else {
    ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  }

  block.replaceChildren(ul);
}
