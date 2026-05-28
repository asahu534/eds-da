export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('grid-row');
    [...row.children].forEach((cell) => {
      cell.classList.add('grid-cell');
      if (cell.children.length === 1 && cell.querySelector('picture')) {
        cell.classList.add('grid-cell-image');
      }
    });
  });
}
