export default function decorate(block) {
  const rows = [...block.children];
  // Expected rows: [images, heading, subheading, ctas]
  const imagesRow = rows[0];
  const headingRow = rows[1];
  const subheadingRow = rows[2];
  const ctaRow = rows[3];

  // Build text column
  const textCol = document.createElement('div');
  textCol.classList.add('hero-homepage-text');

  if (headingRow) {
    const h1 = headingRow.querySelector('h1');
    if (h1) textCol.append(h1);
  }

  if (subheadingRow) {
    const p = subheadingRow.querySelector('p');
    if (p) {
      p.classList.add('hero-homepage-subheading');
      textCol.append(p);
    }
  }

  if (ctaRow) {
    const links = ctaRow.querySelectorAll('a');
    if (links.length > 0) {
      const btnGroup = document.createElement('div');
      btnGroup.classList.add('hero-homepage-buttons');
      links.forEach((a, i) => {
        a.classList.add('button');
        if (i === 0) {
          a.classList.add('primary');
        } else {
          a.classList.add('secondary');
        }
        btnGroup.append(a);
      });
      textCol.append(btnGroup);
    }
  }

  // Build image column
  const imgCol = document.createElement('div');
  imgCol.classList.add('hero-homepage-images');

  if (imagesRow) {
    const pictures = imagesRow.querySelectorAll('picture');
    pictures.forEach((pic) => {
      imgCol.append(pic);
    });
  }

  // Clear block and rebuild
  block.innerHTML = '';
  block.append(textCol);
  block.append(imgCol);
}
