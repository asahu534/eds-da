// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonial-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-testimonial-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // The second cell has the panel content (image, name, role, quote)
    const panelContent = tabpanel.children[1];

    // Extract info from panel content for the tab button
    let avatarHTML = '';
    let name = tab.textContent;
    let role = '';

    if (panelContent) {
      const img = panelContent.querySelector('img');
      if (img) {
        avatarHTML = `<span class="tabs-testimonial-avatar"><img src="${img.getAttribute('src')}" alt="" loading="lazy"></span>`;
      }

      const strongEl = panelContent.querySelector('strong');
      if (strongEl) {
        name = strongEl.textContent;
        const strongP = strongEl.closest('p');
        if (strongP && strongP.nextElementSibling) {
          const nextP = strongP.nextElementSibling;
          // Only use as role if it doesn't start with a quote mark
          if (nextP.textContent && !nextP.textContent.startsWith('“') && !nextP.textContent.startsWith('"')) {
            role = nextP.textContent;
          }
        }
      }
    }

    // build tab button with avatar + name + role
    const button = document.createElement('button');
    button.className = 'tabs-testimonial-tab';
    button.id = `tab-${id}`;
    button.innerHTML = `${avatarHTML}<span class="tabs-testimonial-tab-text"><strong>${name}</strong><span class="tabs-testimonial-tab-role">${role}</span></span>`;

    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.append(tablist);
}
