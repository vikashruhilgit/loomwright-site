# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS (existing GitHub Pages site; no build step)

## Users

Engineers and small teams who already use Cursor or Claude Code, and want a plan-first mill that turns a messy goal into a reviewed pull request without silently merging.

## Product Purpose

Loomwright is a Claude Code plugin that runs Launch Pad (brief), Supervisor (parallel git worktrees), and a bounded review-and-heal pass. Success is an open PR a human can merge.

## Positioning

Plan first, parallel work with ordered merge, never silently merge unless the user opts into a five-condition trusted automate path. Marketplace id `atelier`, plugin id `loomwright`.

## Operating Context

Installed from GitHub (`vikashruhilgit/loomwright`) into Claude CLI, Claude Code, Cursor Agent chat, or Claude Desktop plugins. Needs a git repo; `gh` for pull requests. Commands include `/setup`, `/autonomous`, `/review-pr`, `/automate`.

## Capabilities and Constraints

- 14 agent roles, 21 slash commands, 41 skills, 24 hooks, v15.37
- CLAUDE.md is authority; Twin, lessons, and memory are advisory and human-gated
- Auto-merge only via `/automate --auto-merge`, opt-in, default off
- Not on Anthropic’s official marketplace; add the GitHub marketplace first
- `/plugin` is a chat command, not a shell path

## Brand Commitments

- Name: Loomwright (Vikash Ruhil, MIT)
- Binding visual: sunlit inventor’s loft with tiny visored millwrights and a brass-and-glass pipeline (user-approved still). Bright theme. Out-of-the-box invention, not a dark code editor.
- Metaphor: mill / warp / weft / cloth = workers / review / PR — keep the product language, not the previous night-mill look.

## Evidence on Hand

- Live site copy in `index.html` (install per app, policy knobs, roadmap)
- Approved pipeline still: `assets/pipeline.jpg`
- Source plugin: https://github.com/vikashruhilgit/loomwright
- No customer logos, testimonials, or benchmarks. Do not invent them.

## Product Principles

1. A human still merges.
2. Plan before a file moves.
3. Parallel work, sequential merge.
4. Advisory never promotes itself.
5. Show the mill doing the job; do not claim customers or numbers we do not have.
