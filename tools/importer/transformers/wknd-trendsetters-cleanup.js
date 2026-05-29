/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable site shell elements (navbar, footer, skip-link).
 * Selectors validated against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site shell elements
    // .navbar - site navigation bar (div.navbar containing logo, nav-menu, nav-right)
    // footer.footer - site footer with social links and nav columns
    // noscript, link - non-content elements
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer', 'noscript', 'link']);
  }
}
