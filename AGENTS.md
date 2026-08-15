<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT RULES

## Who I am
Portfolio site owner. I have no coding knowledge. Never explain code to me.
Report what changed as a short plain English list. Nothing more.

## Context discipline
- Only read files needed for the current task. Never explore folders
  speculatively.
- Never read node_modules unless you hit a real Next.js API error you cannot
  solve. Do not read it before routine edits, copy changes or styling work.
- Never read the reference folder if it exists.
- Only change what I asked for. Never refactor or tidy files I did not mention.
- Never install dependencies without asking first.
- Stop when the task is done. Do not move on to the next thing.

## Read first, every session
PROGRESS.md holds the current project state and task order. Read it before
starting work. Update it when a task is confirmed finished.

## Responsive, mandatory on every visual change
Check 375, 768, 1024, 1440, 1920 and 2560px.
No horizontal overflow. No clipped or overlapping text at any width.

## Copy rules
- No em dashes, no en dashes, anywhere. Full stops, commas, colons only.
- The separator across the whole site is a slash, never a dash.
- No swearing. This is global brand campaign work, it stays client safe.
- All copy lives in the single site content file. Never hardcode text into
  components.
- The single copy file is src/data/content.ts. Always use it, never create another.
- Project data lives in src/data/work.ts. One array, edit that only.

## File conventions
- All filenames and folders lowercase, no spaces. Linux servers are case
  sensitive, Windows is not, so capitals and spaces break on deploy.
- Assets in public/: brand/, clients/, images/, videos/, fonts/
- New project page assets live in public/portfolio/[project-slug]/. Existing
  assets under public/images/work/ stay where they are, never move or rename
  them.
- Videos: muted, looping, preload="metadata", poster image, play only when in
  viewport, respect prefers-reduced-motion, under 3MB each.

## Git
- Commit after every confirmed task, without me asking. Short clear message.
- Never push to a remote unless I ask.
- Never use git commands that discard my work, such as reset --hard, checkout
  over uncommitted changes, or clean. If you think work needs discarding, ask
  me first.
