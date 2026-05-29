/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    const images = Array.from(element.querySelectorAll(".grid-layout.grid-gap-xs img.cover-image, .grid-layout img.cover-image"));
    const heading = element.querySelector("h1.h1-heading, h1, h2, h3");
    const description = element.querySelector("p.subheading, p");
    const ctaButtons = Array.from(element.querySelectorAll(".button-group a.button, .button-group a, a.button"));
    const cells = [];
    if (images.length > 0) {
      cells.push(images.length === 1 ? [images[0]] : [images]);
    }
    if (heading) {
      cells.push([heading]);
    }
    if (description) {
      cells.push([description]);
    }
    if (ctaButtons.length > 0) {
      cells.push([ctaButtons]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope > div");
    const leftColumn = columns[0];
    const image = leftColumn ? leftColumn.querySelector("img") : null;
    const rightColumn = columns[1];
    const leftCell = [];
    if (image) {
      leftCell.push(image);
    }
    const rightCell = [];
    if (rightColumn) {
      const breadcrumbs = rightColumn.querySelector(".breadcrumbs");
      if (breadcrumbs) {
        rightCell.push(breadcrumbs);
      }
      const heading = rightColumn.querySelector('h2, h1, h3, [class*="heading"]');
      if (heading) {
        rightCell.push(heading);
      }
      const metaDivs = rightColumn.querySelectorAll(":scope > div:not(.breadcrumbs)");
      metaDivs.forEach((metaDiv) => {
        rightCell.push(metaDiv);
      });
    }
    const cells = [
      [leftCell.length ? leftCell : "", rightCell.length ? rightCell : ""]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/grid-gallery.js
  function parse3(element, { document }) {
    const images = Array.from(element.querySelectorAll(":scope > .utility-aspect-1x1 img.cover-image, :scope > div img"));
    const columnsPerRow = 4;
    const cells = [];
    for (let i = 0; i < images.length; i += columnsPerRow) {
      const row = [];
      for (let j = i; j < i + columnsPerRow && j < images.length; j += 1) {
        row.push(images[j]);
      }
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "grid-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = Array.from(element.querySelectorAll(".tab-pane"));
    const tabButtons = Array.from(element.querySelectorAll(".tab-menu-link"));
    const cells = [];
    tabPanes.forEach((pane, index) => {
      let labelText = "";
      if (tabButtons[index]) {
        const labelStrong = tabButtons[index].querySelector("strong");
        labelText = labelStrong ? labelStrong.textContent.trim() : tabButtons[index].textContent.trim();
      } else {
        const nameEl2 = pane.querySelector(".paragraph-xl strong, strong");
        labelText = nameEl2 ? nameEl2.textContent.trim() : `Tab ${index + 1}`;
      }
      const contentContainer = document.createElement("div");
      const img = pane.querySelector("img.cover-image, img");
      if (img) {
        const imgClone = img.cloneNode(true);
        contentContainer.appendChild(imgClone);
      }
      const nameEl = pane.querySelector(".paragraph-xl strong, strong");
      if (nameEl) {
        const namePara = document.createElement("p");
        const nameStrong = document.createElement("strong");
        nameStrong.textContent = nameEl.textContent.trim();
        namePara.appendChild(nameStrong);
        contentContainer.appendChild(namePara);
      }
      const nameContainer = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (nameContainer) {
        const roleEl = nameContainer.parentElement ? nameContainer.parentElement.querySelector(":scope > div:not(.paragraph-xl)") : null;
        if (roleEl && roleEl.textContent.trim()) {
          const rolePara = document.createElement("p");
          rolePara.textContent = roleEl.textContent.trim();
          contentContainer.appendChild(rolePara);
        }
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) {
        const quotePara = document.createElement("p");
        quotePara.textContent = quote.textContent.trim();
        contentContainer.appendChild(quotePara);
      }
      cells.push([labelText, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(":scope > a.article-card");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".article-card-image img");
      const heading = card.querySelector("h3.h4-heading");
      const tag = card.querySelector(".article-card-meta .tag");
      const date = card.querySelector(".article-card-meta .paragraph-sm");
      const contentCell = [];
      const href = card.getAttribute("href");
      if (heading && href) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = heading.textContent.trim();
        contentCell.push(link);
      } else if (heading) {
        const bold = document.createElement("strong");
        bold.textContent = heading.textContent.trim();
        contentCell.push(bold);
      }
      const metaParts = [];
      if (tag) metaParts.push(tag.textContent.trim());
      if (date) metaParts.push(date.textContent.trim());
      if (metaParts.length > 0) {
        const metaText = document.createTextNode(metaParts.join(" - "));
        contentCell.push(metaText);
      }
      const imageCell = image ? [image] : [""];
      cells.push([imageCell, contentCell.length ? contentCell : [""]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const questionSpan = item.querySelector("summary span, summary");
      const answerDiv = item.querySelector(".faq-answer, summary + div");
      if (questionSpan && answerDiv) {
        const questionText = questionSpan.textContent.trim();
        const questionEl = document.createElement("p");
        questionEl.textContent = questionText;
        const answerContent = [];
        const answerElements = answerDiv.querySelectorAll("p, a, ul, ol");
        if (answerElements.length > 0) {
          answerElements.forEach((el) => answerContent.push(el));
        } else {
          const answerEl = document.createElement("p");
          answerEl.textContent = answerDiv.textContent.trim();
          answerContent.push(answerEl);
        }
        cells.push([questionEl, answerContent.length === 1 ? answerContent[0] : answerContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');
    const heading = element.querySelector(".card-body h2, .card-body h1, .utility-text-on-overlay h2, .utility-text-on-overlay h1, h2.h1-heading");
    const description = element.querySelector(".card-body p.subheading, .card-body p, .utility-text-on-overlay p.subheading, .utility-text-on-overlay p");
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, .card-body a.button, .utility-text-on-overlay a.button"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    if (heading) {
      cells.push([heading]);
    }
    if (description) {
      cells.push([description]);
    }
    if (ctaLinks.length > 0) {
      cells.push([ctaLinks]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer", "noscript", "link"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function findSection(element, selector, childIndex) {
    let el = element.querySelector(selector);
    if (el) return el;
    const adjusted = selector.replace(/^main\s*>\s*/, ":scope > ");
    if (adjusted !== selector) {
      el = element.querySelector(adjusted);
      if (el) return el;
    }
    if (childIndex > 0) {
      el = element.querySelector(`:scope > :nth-child(${childIndex})`);
    }
    return el;
  }
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const childIndex = i + 1;
        const sectionEl = findSection(element, section.selector, childIndex);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "columns-feature": parse2,
    "grid-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: ["https://wknd-trendsetters.site/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-feature",
        instances: ["main > section:nth-child(2) .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "grid-gallery",
        instances: [".secondary-section .grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".secondary-section .grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.section.inverse-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "dark",
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Feature Article",
        selector: "main > section:nth-child(2)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Photo Gallery",
        selector: "main > section.secondary-section:nth-of-type(2)",
        style: "grey",
        blocks: ["grid-gallery"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-child(4)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section.secondary-section:nth-of-type(3)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-child(6)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout.grid-gap-xxl > div:first-child h2", ".grid-layout.grid-gap-xxl > div:first-child .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
