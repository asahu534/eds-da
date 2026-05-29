import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-article-card-image';
      } else {
        div.className = 'cards-article-card-body';
      }
    });

    // Restructure card body: extract link title and meta text
    const body = li.querySelector('.cards-article-card-body');
    if (body) {
      const link = body.querySelector('a');
      const href = link ? link.getAttribute('href') : '';
      const title = link ? link.textContent.trim() : '';

      // Get remaining text (tag - date pattern)
      const fullText = body.textContent.trim();
      const metaText = fullText.replace(title, '').trim();

      // Parse meta: "Casual Cool - May 12" -> tag="Casual Cool", date="May 12"
      let tag = '';
      let date = '';
      if (metaText) {
        const parts = metaText.split(' - ');
        if (parts.length === 2) {
          tag = parts[0].trim();
          date = parts[1].trim();
        } else {
          tag = metaText;
        }
      }

      // Rebuild card body
      body.innerHTML = '';

      const metaDiv = document.createElement('div');
      metaDiv.className = 'cards-article-card-meta';
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'cards-article-card-tag';
        tagSpan.textContent = tag;
        metaDiv.append(tagSpan);
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.className = 'cards-article-card-date';
        dateSpan.textContent = date;
        metaDiv.append(dateSpan);
      }
      body.append(metaDiv);

      const heading = document.createElement('h3');
      heading.textContent = title;
      body.append(heading);

      // Wrap entire li in a link for clickability
      if (href) {
        const cardLink = document.createElement('a');
        cardLink.href = href;
        cardLink.className = 'cards-article-card-link';
        cardLink.setAttribute('aria-label', title);
        while (li.firstChild) cardLink.append(li.firstChild);
        li.append(cardLink);
      }
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
