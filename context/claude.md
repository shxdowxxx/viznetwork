---
session_id: SIZ-20260423-1430
date: 2026-04-23
last_updated: 2026-04-23 14:30 UTC
project: VizNetworks
agent: SessionCloseoutAgent
current_phase: Phase 1 — Foundation & Launch
---

# Claude Context — VizNetworks

Read this file at the start of any VizNetworks session.

## What This Project Is
VizNetworks is a guns.lol-style public profile platform. Users sign up, claim a unique username, and receive a shareable page at `viznetwork.org/username`. It is a standalone TheSizCorporation project — separate from siznexus-development, discord-bot, IntellectualOS, and AtlasOS.

## Infrastructure
- **Local path:** `/home/itzzzshxdow/viznetworks/`
- **GitHub remote:** `https://github.com/shxdowxxx/viznetwork`
- **Branch:** `main`
- **Hosting:** GitHub Pages with custom domain `viznetwork.org`
- **DNS:** Porkbun (authoritative) — 4 GitHub A records + www CNAME to `shxdowxxx.github.io`. Cloudflare is NOT in the chain.
- **Firebase project:** `viznetwork-9be19` (separate from thesiznexus and atlasos-c61b0)
- **Firebase services:** Authentication (Email/Password + Google), Firestore

## File Structure
All files are in the repo root — no build step, no framework.
- `index.html` — Landing page + profile viewer SPA
- `auth.html` — Sign up / sign in
- `dashboard.html` — Profile editor (auth-guarded)
- `style.css` — Shared design system (all pages import this)
- `firebase-config.js` — Firebase 11.6.0 ES module init; exports `auth` and `db`
- `404.html` — GitHub Pages SPA routing trick
- `CNAME` — `viznetwork.org`

## Firestore Schema
- `profiles/{username}` — `{ uid, displayName, bio, avatar, accentColor, links[] }`
- `usernames/{username}` — `{ uid }` — fast uniqueness lookup table

Username rules: lowercase alphanumeric + underscore, 3-20 characters.

## SPA Routing Mechanism
GitHub Pages does not support server-side routing. The workaround:
1. `404.html` catches any unknown path (e.g. `/johndoe`), stores it in `sessionStorage('vn_redirect')`, redirects to `/`.
2. `index.html` checks `sessionStorage('vn_redirect')` on load, parses the username from the path, and renders the profile view instead of the landing page.

## Design System
- **Aesthetic:** Minimal dark premium — NOT the dense cyberpunk aesthetic of siznexus. This is a public-facing user product.
- **Fonts:** Orbitron (headings), Inter (body), Share Tech Mono (mono/accents)
- **Colors:** Dark backgrounds, subtle borders, 8 accent color presets for user profiles
- **Effects:** Page fade-in only. No particles, no scan lines, no heavy glow.
- All design tokens are CSS variables in `:root` in `style.css`.

## Current Phase State
**Phase 1 — Foundation & Launch:** All six core files built and pushed. GitHub Pages live. SSL provisioning. Firestore rules NOT yet deployed — this is the immediate blocker before any live users.

## Critical Outstanding Actions
1. Enable "Enforce HTTPS" in GitHub Pages settings once the SSL cert finishes provisioning.
2. Write and deploy Firestore security rules to `viznetwork-9be19`:
   - `profiles/{username}`: public read, write only if `request.auth.uid == resource.data.uid`
   - `usernames/{username}`: public read, write only if doc does not exist yet and `request.auth.uid == request.resource.data.uid`
3. End-to-end test: sign up, claim username, fill profile, visit public URL.

## Phase 2 Ideas (Not Started)
- Custom themes beyond the 8 color presets
- Profile view count analytics
- Profile badges and verified indicators
- Vanity/reserved usernames

## What Claude Should Know
- Always edit `firebase-config.js` as a shared module — never duplicate Firebase init logic into individual pages.
- The `style.css` file is shared across all pages. All new UI elements must use existing CSS variables, not hardcoded values.
- Firestore rules for this project are separate from siznexus firebaserules.md — do not mix them.
- Do not add particles.js or heavy animation effects to this project. The design is intentionally lighter than siznexus.
