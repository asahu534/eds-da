/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters sections.
 * Inserts <hr> section breaks and Section Metadata blocks based on template sections.
 * Selectors validated against captured DOM in migration-work/cleaned.html.
 *
 * Template sections (homepage):
 *   1. Hero: header.section.secondary-section (style: "dark")
 *   2. Feature Article: section:nth-child(2) (style: null)
 *   3. Photo Gallery: section:nth-child(3) with .secondary-section (style: "grey")
 *   4. Testimonials: section:nth-child(4) (style: null)
 *   5. Latest Articles: section:nth-child(5) with .secondary-section (style: "grey")
 *   6. FAQ: section:nth-child(6) (style: null)
 *   7. CTA Banner: section.section.inverse-section (style: null)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

/**
 * Resolves a section selector against the element (which is <main>).
 * Tries the original selector, then adjusts "main > " prefix to ":scope > ",
 * then falls back to nth-child position matching.
 */
function findSection(element, selector, childIndex) {
  // Try original selector as-is
  let el = element.querySelector(selector);
  if (el) return el;

  // Try stripping "main > " prefix since element IS main
  const adjusted = selector.replace(/^main\s*>\s*/, ':scope > ');
  if (adjusted !== selector) {
    el = element.querySelector(adjusted);
    if (el) return el;
  }

  // Fallback: use nth-child position (1-based childIndex)
  if (childIndex > 0) {
    el = element.querySelector(`:scope > :nth-child(${childIndex})`);
  }
  return el;
}

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      // childIndex is 1-based position among main's children
      const childIndex = i + 1;
      const sectionEl = findSection(element, section.selector, childIndex);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Insert <hr> before every section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
