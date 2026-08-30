# Loomwright site

Public landing page for Loomwright — the plan-first mill that weaves a goal into a reviewed pull request.

Same craft as [Block Paradise](https://vikashruhilgit.github.io/): one static page, dark mill, no build step.

## Preview locally

```bash
python3 -m http.server 4173
```

Open http://127.0.0.1:4173/

## Publish to GitHub Pages

**Option A — sibling of Block Paradise**

Copy this folder into `vikashruhilgit.github.io/loomwright/` so the live URL is:

https://vikashruhilgit.github.io/loomwright/

**Option B — this repo as Pages**

1. Create `vikashruhilgit/loomwright-site` (or similar) on GitHub
2. Push `main`
3. Settings → Pages → Deploy from `main` / root

Relative asset paths work at both `/` and `/loomwright/`.
