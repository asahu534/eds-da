export default function decorate(block) {
  // Flatten rows: source uses a flat grid of image cells
  // EDS authored structure has rows > cells, flatten to direct children
  const cells = [...block.querySelectorAll(':scope > div > div')];
  // Remove original rows
  [...block.children].forEach((row) => row.remove());
  // Re-append cells directly to the block
  cells.forEach((cell) => {
    cell.classList.add('grid-gallery-item');
    block.append(cell);
  });
}
