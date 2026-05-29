/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-testimonial
 * Base block: tabs
 * Source: https://wknd-trendsetters.site/
 * Selector: .tabs-wrapper
 * Generated: 2026-05-28
 *
 * Extracts tabbed testimonial content from .tabs-wrapper.
 * Each tab has a label (person name) and content (image + name + role + quote).
 * Output: one row per tab with [tab-label, tab-content].
 */
export default function parse(element, { document }) {
  // Extract tab panes (content panels)
  const tabPanes = Array.from(element.querySelectorAll('.tab-pane'));

  // Extract tab menu buttons (labels)
  const tabButtons = Array.from(element.querySelectorAll('.tab-menu-link'));

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // --- Tab Label (column 1) ---
    // Use the tab button text as the label; fall back to name from content
    let labelText = '';
    if (tabButtons[index]) {
      const labelStrong = tabButtons[index].querySelector('strong');
      labelText = labelStrong ? labelStrong.textContent.trim() : tabButtons[index].textContent.trim();
    } else {
      // Fallback: extract name from pane content
      const nameEl = pane.querySelector('.paragraph-xl strong, strong');
      labelText = nameEl ? nameEl.textContent.trim() : `Tab ${index + 1}`;
    }

    // --- Tab Content (column 2) ---
    // Build content container with image, name, role, and quote
    const contentContainer = document.createElement('div');

    // Image
    const img = pane.querySelector('img.cover-image, img');
    if (img) {
      const imgClone = img.cloneNode(true);
      contentContainer.appendChild(imgClone);
    }

    // Name (strong text)
    const nameEl = pane.querySelector('.paragraph-xl strong, strong');
    if (nameEl) {
      const namePara = document.createElement('p');
      const nameStrong = document.createElement('strong');
      nameStrong.textContent = nameEl.textContent.trim();
      namePara.appendChild(nameStrong);
      contentContainer.appendChild(namePara);
    }

    // Role/subtitle (div after the name div)
    const nameContainer = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (nameContainer) {
      const roleEl = nameContainer.parentElement ? nameContainer.parentElement.querySelector(':scope > div:not(.paragraph-xl)') : null;
      if (roleEl && roleEl.textContent.trim()) {
        const rolePara = document.createElement('p');
        rolePara.textContent = roleEl.textContent.trim();
        contentContainer.appendChild(rolePara);
      }
    }

    // Quote paragraph
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) {
      const quotePara = document.createElement('p');
      quotePara.textContent = quote.textContent.trim();
      contentContainer.appendChild(quotePara);
    }

    cells.push([labelText, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
