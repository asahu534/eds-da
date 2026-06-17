/**
 * api-feed block
 * Fetches JSON from an author-provided API endpoint and renders cards.
 * Author provides the endpoint URL in the first cell of the block.
 */
export default async function decorate(block) {
  // Read the endpoint URL the author entered in the block
  const endpoint = block.textContent.trim();
  block.textContent = '';

  if (!endpoint) {
    block.innerHTML = '<p class="api-feed-error">No API endpoint provided.</p>';
    return;
  }

  // Loading state
  const loading = document.createElement('p');
  loading.className = 'api-feed-loading';
  loading.textContent = 'Loading…';
  block.append(loading);

  try {
    const resp = await fetch(endpoint);
    if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);
    const data = await resp.json();

    // Support both a bare array or an object with an items/data array
    let items = [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data.items)) items = data.items;
    else if (Array.isArray(data.data)) items = data.data;
    else items = [data];

    loading.remove();

    const list = document.createElement('ul');
    list.className = 'api-feed-list';

    items.slice(0, 12).forEach((user) => {
      const li = document.createElement('li');
      li.className = 'api-feed-item';

      const h3 = document.createElement('h3');
      h3.textContent = user.name || 'Unknown';
      li.append(h3);

      if (user.email) {
        const email = document.createElement('p');
        email.className = 'api-feed-email';
        const link = document.createElement('a');
        link.href = `mailto:${user.email}`;
        link.textContent = user.email;
        email.append(link);
        li.append(email);
      }

      if (user.company && user.company.name) {
        const company = document.createElement('p');
        company.className = 'api-feed-company';
        company.textContent = user.company.name;
        li.append(company);
      }

      if (user.website) {
        const website = document.createElement('p');
        website.className = 'api-feed-website';
        website.textContent = user.website;
        li.append(website);
      }

      list.append(li);
    });

    block.append(list);
  } catch (error) {
    loading.remove();
    const err = document.createElement('p');
    err.className = 'api-feed-error';
    err.textContent = `Could not load feed: ${error.message}`;
    block.append(err);
  }
}
