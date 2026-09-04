# Loomwright site

Public landing for Loomwright — a messy goal in, a reviewed pull request out. You only show up when it actually needs you.

**Live:** https://vikashruhilgit.github.io/loomwright-site/

Static HTML on GitHub Pages. No build step.

- `index.html` — four problems the mill solves, image-led
- `mill.html` — four laws, pipeline, plays
- `guide.html` — first hour, policy, rollout, roadmap
- `install.html` — CLI, Claude Code, Cursor, Desktop

## Numbers that can go stale

The site deliberately carries **no version string** — a hand-copied version drifted twice
(15.37 -> 15.41 -> stale again at 15.45) and nothing on the page needs it.
Do not reintroduce one. There is no build step and should not be.

The four capability counts are still hand-maintained. On a plugin release, check them against
`loomwright/.claude-plugin/plugin.json` and the `agents/`, `commands/`, `skills/` dirs, then update:

| File | What |
|---|---|
| `index.html` | hero stamps (`<ul class="stamps">`) + footer fine print |
| `mill.html` | footer fine print |
| `guide.html` | footer fine print |
| `install.html` | footer fine print |
| `PRODUCT.md` | Capabilities line |

Verify with:

```bash
grep -rn '14 agents\|<b>14</b>' --include='*.html' --include='*.md' .
```

## Preview locally

```bash
python3 -m http.server 4173
```

Open http://127.0.0.1:4173/
