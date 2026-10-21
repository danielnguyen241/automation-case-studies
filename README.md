# Automation Case Studies: Daniel Nguyen

A static, single-page portfolio with two case studies of SEO and AI-agent automation, plus a grid of the open-source tools behind them.

- **01 Backlink Automation Pipeline:** a 1,818-site guest-post audit graded S–F, backlink sheet sync and live-link audit, and a competitor teardown (DataForSEO + Semrush, 16-page PDF).
- **02 AI Agent Operations:** a 22-channel content monitor posting to Discord, task-report reminders, Upwork candidate screening, policy-safe GBP optimisation, and an AI-influencer content pipeline.

Every number on the page comes from real agent work logs and exports. Nothing is invented.

## Structure
```
index.html     page markup and case-study copy (Problem / System / Results)
style.css      design system (dark theme, violet gradient from danielnguyen.solutions)
workflow.js    n8n-style workflow renderer + WORKFLOWS data (nodes, edges, icons)
content.js     "Built tools" cards (TOOLS array, one entry per GitHub repo)
main.js        hero agent network, cursor, scroll reveal, count-up
assets/        real screenshots, PDF pages, reels, carousel slides, cat cursor
preview*.png   headless screenshots (desktop / mobile)
```

## Editing content
- **Copy and numbers:** edit `index.html`. Count-up numbers use `data-n="123"`, and the text inside the tag is the no-JS fallback, so keep both in sync.
- **Workflow diagrams:** edit `WORKFLOWS` in `workflow.js`. Nodes are `[title, subtitle, icon]` and edges are `[from, to, optionalLabel]`. Available icons: `cron sheets discord semrush dataforseo upwork gmb ai if http mail pdf video code`. Columns are laid out automatically.
- **Tool cards:** edit `TOOLS` in `content.js`.
- **Screenshot slots:** every `<div class="slot" data-slot="…">` is a placeholder for a screenshot that still needs capturing. Replace it with:
  ```html
  <figure class="shot rv"><div class="chrome"><i></i><i></i><i></i><span>Title</span></div><img src="assets/your-file.webp" alt="…" loading="lazy"><figcaption>…</figcaption></figure>
  ```
  Before committing, redact emails, phone numbers, passwords and tokens.

## Run locally
No build step: `python3 -m http.server 8080`, then open http://localhost:8080.

## Deploy (Vercel)
```bash
npm i -g vercel
vercel --prod --yes        # from the repo root; static site, no framework preset
```
Or import the GitHub repo in the Vercel dashboard (Framework: *Other*, no build command, output dir `.`). Every push to `main` then deploys automatically.
