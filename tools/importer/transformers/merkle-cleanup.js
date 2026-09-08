/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Merkle site-wide cleanup.
 * Removes non-authorable site-shell chrome so the import contains only
 * page-level authorable content (everything under <main id="main-content">).
 *
 * All selectors validated by reading migration-work/cleaned.html:
 *   - a.screenreader-header  -> skip-to-main-content link (line 10)
 *   - header.experiencefragment -> global site header (logo, nav, language nav, search) (line 9)
 *   - footer.experiencefragment -> global site footer (line 1008)
 *   - #onetrust-consent-sdk  -> OneTrust cookie consent SDK/banner (line 1148)
 *   - #ot-fltr-modal         -> OneTrust cookie-settings modal (line 1331)
 *   - iframe                 -> reCAPTCHA / DoubleClick / TTD tracking pixels
 *                               (all live outside #main-content; the authorable
 *                               video-centered block uses a <video> tag, not an iframe)
 *   - .mer-header-space      -> spacer div injected by the sticky header (line 2)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove overlays/consent chrome before block parsing so they can't
    // interfere with block matching.
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#ot-fltr-modal',
      // <noscript> holds analytics fallback pixels (Bing UET, Meta Pixel) as
      // inert text in the live DOM; removing the elements now prevents those
      // pixels from materializing as <img>/<picture> during serialization.
      'noscript',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site shell (header, footer, skip link, spacer)
    // and tracking iframes after block parsing.
    WebImporter.DOMUtils.remove(element, [
      'header.experiencefragment',
      'footer.experiencefragment',
      'a.screenreader-header',
      '.mer-header-space',
      'iframe',
      'h1.visually-hidden', // hidden SEO-only heading, not authorable content
    ]);

    // Remove analytics/tracking beacon images (Bing UET, Meta Pixel). These are
    // 1x1 pixels injected for measurement, not page content. Match on src so both
    // the <img id="batBeacon..."> beacon and <noscript> fallback pixels are caught.
    element.querySelectorAll('img[src]').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (/bat\.bing\.com|facebook\.com\/tr/.test(src)) {
        const wrapper = img.closest('p');
        img.remove();
        // Drop the now-empty wrapping <p> so no blank paragraph survives.
        if (wrapper && !wrapper.textContent.trim() && !wrapper.querySelector('img, picture')) {
          wrapper.remove();
        }
      }
    });
  }
}
