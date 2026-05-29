/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source selector: .faq-list
 * Generated: 2026-05-28
 *
 * Source structure:
 *   .faq-list > details.faq-item
 *     summary.faq-question > span (question text)
 *     .faq-answer > p (answer text)
 *
 * Target table structure (from library example):
 *   | Accordion |
 *   | Question | Answer |
 *   (one row per FAQ item, two columns: question and answer)
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from the source
  const faqItems = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question text from summary > span, fallback to summary text content
    const questionSpan = item.querySelector('summary span, summary');
    const answerDiv = item.querySelector('.faq-answer, summary + div');

    if (questionSpan && answerDiv) {
      // Build question cell - use the span text as a clean heading
      const questionText = questionSpan.textContent.trim();
      const questionEl = document.createElement('p');
      questionEl.textContent = questionText;

      // Build answer cell - clone the answer content to preserve paragraphs/links
      const answerContent = [];
      const answerElements = answerDiv.querySelectorAll('p, a, ul, ol');
      if (answerElements.length > 0) {
        answerElements.forEach((el) => answerContent.push(el));
      } else {
        // Fallback: use the answer div text content
        const answerEl = document.createElement('p');
        answerEl.textContent = answerDiv.textContent.trim();
        answerContent.push(answerEl);
      }

      cells.push([questionEl, answerContent.length === 1 ? answerContent[0] : answerContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
