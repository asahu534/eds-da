export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-feature-card-image';
      else div.className = 'cards-feature-card-body';
    });
    ul.append(li);
  });
  /* Capability icons are transparent Scene7 PNGs (fmt=png-alpha). The DM
     auto-block renders them as opaque webp/jpg, which puts a white box behind
     each shape on the dark section. Restore png-alpha so transparency shows. */
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
  block.textContent = '';
  block.append(ul);
}
