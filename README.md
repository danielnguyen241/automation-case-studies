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
crm.html       case study 03: HiAgency HQ internal CRM
docs/          portfolio-notes.md (Vietnamese project notes, the source for the copy)
scripts/       capture / redaction / render helpers (no credentials)
preview*.png   headless screenshots (desktop / mobile, top + full page)
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

## Scripts
Requires Node 18+ with `npm i playwright && npx playwright install chromium` (or set `CHROME=/path/to/chrome`), plus Python 3 with Pillow.

| Script | What it does |
|---|---|
| `scripts/capture-hq.mjs` | Logs in to HiAgency HQ and captures the 7 tabs at 1440×900 @2x, applying `hq-redact.js` before each shot. It only navigates and never saves anything. |
| `scripts/hq-redact.js` | In-page redaction: names become "Member A–H", avatars become placeholders, admin becomes "admin", and task, log and appraisal text is covered with solid bars. Nothing is blurred. |
| `scripts/export-images.py` | Converts captures, PDF pages or a single PNG to WebP (lossless, native resolution). |
| `scripts/render-data-tables.py` + `scripts/render-html-shots.mjs` | Render real CSV/TSV/log exports as Sheet-style tables, then screenshot them at 2x. |
| `scripts/previews.mjs` | Refreshes all `preview*.png`. |

### Recapturing the CRM screenshots
```bash
export HQ_USER='…' HQ_PASS='…'          # never commit these
node scripts/capture-hq.mjs              # writes PNGs to /tmp/hq-capture (override with OUT=)
# open EVERY PNG and check that no real names, photos or log text are visible
python3 scripts/export-images.py crm /tmp/hq-capture
node scripts/previews.mjs
git add assets/crm preview*.png && git commit -m "Recapture HQ" && git push
```
If the HQ markup changes, update the name list and selectors in `hq-redact.js`. Never commit raw, unredacted captures.

## Handoff
- **GitHub:** https://github.com/danielnguyen241/automation-case-studies (branch `main`)
- **Vercel:** project `portfolio-site` on account `dattechxmarketing-4978` (team `dattechxmarketing-gmailcoms-projects`)
- **Production URL:** https://portfolio-site-coral-omega-75.vercel.app (crm page: `/crm.html`)
- **Auto-deploy:** the Vercel project is connected to this GitHub repo. Every push to `main` builds a production deployment (static, no build step), and other branches get preview URLs. If a push doesn't show up, run `vercel --prod --yes` from the repo root after `vercel link` (choose `portfolio-site`).
- **Custom domain:** in Vercel go to Project → Settings → Domains, add one (e.g. `cases.danielnguyen.solutions`) and create the CNAME it shows.
