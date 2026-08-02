# Mind Body & Soul — Luxury Villa Landing Page

Premium single-page website for **Mind Body & Soul**, a private luxury villa retreat in Dambulla, Sri Lanka.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Lenis
- `next/font` (Cormorant Garamond + Figtree)
- `next/image` with remote Unsplash imagery

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploy on Netlify

This repo is configured for the **Essential Next.js** runtime (`@netlify/plugin-nextjs`).

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20` (via `.nvmrc` / `netlify.toml`) |
| Plugin | `@netlify/plugin-nextjs` (in `netlify.toml`) |

In the Netlify UI: **Site settings → Build & deploy** — leave framework detection as Next.js, or clear custom publish overrides so they match `netlify.toml`. Then trigger **Clear cache and deploy site**.

Do **not** set publish to `out` / `dist`, and do **not** enable `output: 'export'` unless you intentionally want a static-only export (this site uses the Next.js runtime plugin).

## Content source

Villa story, chalet names, features, contacts, and location details are based on [mindbodyandsoul.lk](https://mindbodyandsoul.lk/). The visual design is an original luxury redesign and does not copy the reference site.
