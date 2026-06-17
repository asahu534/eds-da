# Create robots.txt for EDS/DA Project

## Overview

In Edge Delivery Services, `robots.txt` controls how search engine crawlers access your site. By default, EDS serves a generic `robots.txt`, but you can provide a custom one. The setup differs slightly between **preview** (`.aem.page`) and **live** (`.aem.live`) tiers — preview is always blocked from indexing, while live serves your custom rules.

## Where robots.txt comes from

There are two ways to provide a custom `robots.txt`:

1. **Config Service (recommended)** — Set the `robots.txt` content in your site configuration at `da.live/config#/asahu534/eds-da/`. This is the modern approach and takes precedence.
2. **Repo file** — Place a `robots.txt` at the repo root (legacy `fstab.yaml`-based projects). Ignored once Config Service is enabled.

## Typical content

A standard `robots.txt` for a live EDS site references the sitemap and allows crawling:

```
User-agent: *
Allow: /

Sitemap: https://main--eds-da--asahu534.aem.live/sitemap.xml
```

To disallow specific paths (drafts, fragments, tools):

```
User-agent: *
Allow: /
Disallow: /drafts/
Disallow: /fragments/
Disallow: /tools/

Sitemap: https://main--eds-da--asahu534.aem.live/sitemap.xml
```

## Important notes

- **Preview tier** (`.aem.page`) is always `noindex` regardless of your robots.txt — Adobe blocks crawlers there automatically.
- **Production domain** — When you go live on your own domain, the `Sitemap:` line should point to your production domain, not the `.aem.live` URL.
- `robots.txt` only controls crawling, not sitemap inclusion. Use `noindex` metadata (covered earlier) to exclude pages from the sitemap itself.

## Checklist

- [ ] Decide delivery method: Config Service (recommended) or repo-root file
- [ ] Confirm whether the site uses Config Service (check `da.live/config#/asahu534/eds-da/`)
- [ ] Draft `robots.txt` content (User-agent, Allow/Disallow rules, Sitemap line)
- [ ] Set the correct `Sitemap:` URL (`https://main--eds-da--asahu534.aem.live/sitemap.xml`, or production domain when live)
- [ ] Add any `Disallow:` rules for `/drafts/`, `/fragments/`, `/tools/` if needed
- [ ] Apply the config (Config Service entry) OR create the repo-root `robots.txt` file
- [ ] Publish/deploy the change
- [ ] Verify at `https://main--eds-da--asahu534.aem.live/robots.txt`
- [ ] Confirm the `Sitemap:` line resolves to a valid sitemap

## Notes

Execution requires **Execute mode** — switch out of plan mode to have me create the `robots.txt` file in the repo or guide you through the Config Service entry.
