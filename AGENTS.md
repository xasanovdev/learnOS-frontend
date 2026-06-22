<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions

## Project Context

This is the `learnOS` frontend: a Next.js App Router application for a focused YouTube learning workspace. The app uses Next `16.2.9`, React `19.2.4`, TypeScript strict mode, Tailwind CSS v4, shadcn/Radix-style UI primitives, SWR, react-hook-form, zod, and lucide-react icons.

Primary paths:

- `app/`: App Router routing only: route groups, route segments, layouts, pages, loading/error/not-found files, route handlers, and global styles.
- `features/`: business/domain logic, feature components, feature hooks, services, schemas, types, and feature-local utilities.
- `components/`: shared UI only. Keep this business-neutral.
- `components/ui/`: shadcn-style primitives. Prefer extending these before adding one-off controls.
- `components/shared/`: generic shared UI pieces such as the brand logo and shimmer primitive.
- `lib/`: infrastructure and generic helpers, including API fetch behavior in `lib/api/`.
- `hooks/`: generic app-wide hooks only. Feature hooks belong in `features/*/hooks/`.
- `proxy.ts`: Next 16 Proxy for dashboard auth redirects. This is not legacy Middleware.

There is intentionally no `src/` directory. Use the root-level folders above.

## Before Editing

- Analyze the available skills first, then use the smallest relevant set. If a skill applies, read its `SKILL.md` completely before acting and follow its workflow.
- Read the local Next docs for the API or convention you are touching. Good starting points:
  - `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`
- Inspect nearby code and follow the local pattern before introducing a new abstraction.
- Keep changes narrowly scoped to the requested behavior. Do not refactor unrelated files.
- Do not add dependencies or change lockfiles unless the task genuinely requires it.

## Agent skills

### Issue tracker

Issues, PRDs, and implementation slices live in GitHub Issues for `xasanovdev/learnOS-frontend`. Use `gh` from the repository root so it infers the repository from `git remote -v`.

### Triage labels

Use the default canonical triage state labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. Every triaged issue should carry exactly one state label and exactly one category label such as `bug` or `enhancement`. AFK-ready work uses `ready-for-agent`; work requiring human judgment uses `ready-for-human`.

### Domain docs

This is a single-context repo. Read root `CONTEXT.md` and relevant `docs/adr/` files when they exist; proceed silently when they do not. Use established domain vocabulary in issue titles, tests, implementation notes, and review findings. Surface conflicts with existing ADRs instead of silently overriding them.

### Engineering skill package

The engineering skill package is vendored from `addyosmani/agent-skills` without content changes:

- Skill workflows live in `.agents/skills/<skill-name>/SKILL.md` and are discovered automatically.
- Shared skill checklists live in `.agents/references/`.
- Keep these files synchronized with the upstream clone by copying them again; do not maintain project-specific edits inside the vendored files.

Use `using-agent-skills` to select the smallest relevant workflow for a task. The skill package supplements the project-specific rules in this file; it does not override them.

### Specialist agents

Project-scoped Codex custom agents live at:

- `.codex/agents/code-reviewer.toml`
- `.codex/agents/security-auditor.toml`
- `.codex/agents/test-engineer.toml`
- `.codex/agents/web-performance-auditor.toml`

Each manifest is a thin adapter over the exact upstream persona prompt in `.agents/*.md`, keeping the vendored prompt as the source of truth. Codex discovers these manifests in trusted projects. Spawn or parallelize them only when the user explicitly requests delegation, subagents, or parallel agent work; the primary agent owns orchestration and final synthesis.

### Skill Routing

- Use `zoom-out` when the code area is unfamiliar and you need a map of modules, callers, and domain terms before editing.
- Use `diagnose` for bugs, broken behavior, thrown errors, or performance regressions. Build a fast repro loop before fixing.
- Use `tdd` when the user asks for test-first work or when a change has meaningful behavioral risk. Add one behavior test at a time and keep tests on public interfaces.
- Use `frontend-design` for new or substantially changed UI. Match the product context and existing design system rather than producing generic layouts.
- Use `react-doctor` after React changes when practical, especially after feature work, bug fixes, or reviews.
- Use `improve-codebase-architecture` for refactor requests, testability problems, shallow modules, or broad architecture review.
- Use `to-prd`, `to-issues`, and `triage` only for product planning and issue-tracker workflows; follow the tracker and label conventions in this file.

## Architecture Rules

- Use this mental model: `app/` is for routing, `features/` is for business logic, `components/` is for shared UI, and `lib/` is for infrastructure.
- Keep `app/` thin. Route files should compose feature components, unwrap `params`/`searchParams`, define metadata, and handle route-level redirects only.
- Use route groups such as `(marketing)`, `(auth)`, and `(workspace)` to separate layouts without changing URLs.
- Route-private `_components` folders are allowed only for code that is genuinely specific to one route. Domain-level code belongs in `features/`.
- Default to Server Components in `app/` and feature components. Add `"use client"` only when the file needs state, effects, event handlers, browser APIs, SWR, or client hooks.
- Keep client boundaries small. A file marked `"use client"` pulls its imports into the client bundle, so avoid placing large static layouts or data-only helpers behind that boundary.
- Use App Router file conventions. A route is exposed by `page.tsx` or `route.ts`; colocated helper files are fine, but do not put `route.ts` at the same route segment level as `page.tsx`.
- Use `next/link` for internal navigation and `next/navigation` hooks only in Client Components.
- Treat `proxy.ts` as an optimistic redirect layer only. Do not put slow data fetching, full session validation, or business logic there.
- Keep shared domain types close to the code that consumes them until they are reused across multiple modules.
- Use predictable feature subfolders: `components/`, `hooks/`, `services/`, `schemas/`, `types/`, and `utils/` when those responsibilities exist.
- Use clear suffixes for non-component modules: `.service.ts`, `.schema.ts`, `.types.ts`, `.server.ts`, and `.client.tsx` when a boundary needs to be explicit.

## Data, Auth, And API Calls

- Browser-side API calls should go through `fetcher` in `lib/api/fetcher.ts` so credentials, JSON headers, `401` refresh, `204`, and empty responses are handled consistently.
- Feature API functions belong in `features/*/services/*.service.ts`; feature SWR hooks belong in `features/*/hooks/`.
- Reusable hooks should accept route params/search params as arguments. Do not read `useSearchParams()` or route params inside a reusable feature hook unless the hook is explicitly route-specific.
- Preserve the existing rewrite model in `next.config.ts`: frontend paths such as `/auth/*`, `/rooms/*`, and `/videos/*` are forwarded to `NEXT_PUBLIC_API_URL`.
- Use SWR for client-loaded remote data when following existing dashboard/auth patterns.
- Validate user input with zod and surface form errors through the existing form/UI components.
- Never expose secrets to the client. Only `NEXT_PUBLIC_*` environment variables are safe for browser code.

## TypeScript And React Quality

- Keep `strict` TypeScript clean. Avoid `any`; prefer explicit domain types and narrow unions.
- Prefer derived values with `useMemo` only when it avoids meaningful repeated work or clarifies state derivation. Do not memoize everything by default.
- Keep async handlers explicit about loading, success, and failure states.
- Make invalid states hard to represent when practical, especially for request status, form state, and auth state.
- Keep components readable. If a component grows large, extract cohesive child components or helpers in the same feature area.

## Component Structure And Refactoring

- Prefer clean, component-based file structure over large multi-component modules.
- Keep one main component per file. Small private helpers are fine, but extract meaningful UI sections into their own files once they have independent props, state, layout responsibility, or reuse potential.
- Use named exports for project components and helpers. Avoid default exports except where framework conventions require them, such as route pages and layouts.
- Preserve existing UI, styling, behavior, props, and TypeScript contracts during refactors. Do not mix structural cleanup with business-logic changes unless the user asks for both.
- Before a meaningful refactor, identify and communicate the proposed folder/file structure. Keep it feature-local and avoid creating excessive tiny files for trivial helpers.
- Put pure shared helper functions in a nearby `utils.ts` or feature utility file. Do not hide business logic inside visual components when it can be named and tested separately.
- Put loading, empty-state, and skeleton UI in a dedicated nearby skeleton/loading area when there are multiple variants or when the skeleton mirrors a full page layout. Feature-specific skeletons belong with their feature, not in `components/shared/`.
- Put small reusable feature UI pieces in a nearby `components/` folder when a feature needs several shared controls or display components.
- Keep shared UI primitives and business-neutral shared components in `components/`; do not put feature-specific cards, forms, pages, modals, or data-aware UI there.
- Add `"use client"` only to files that need React hooks, event handlers, browser APIs, router/search param hooks, SWR, or other client-only behavior. Keep static presentational components as Server Component-compatible when possible.
- Avoid circular imports. Shared UI may import utilities, but utilities should not import UI components.
- Keep imports clean after splitting files. Prefer `@/*` aliases for cross-folder imports and relative imports only for tight feature-local neighbors.

## Review Expectations

- In reviews and self-review, flag oversized components, mixed responsibilities, unnecessary client boundaries, duplicated skeleton markup, hidden business logic in UI files, and circular dependency risk.
- Treat refactor output as incomplete until lint and TypeScript pass, and run a build when routes, layouts, client/server boundaries, or Next conventions changed.
- When summarizing a refactor, list the changed files and the responsibility each file now owns.

## Styling And UI

- Treat `features/landing/components/landing-page.tsx` and its section components as the canonical visual reference for marketing and top-level product surfaces.
- The active style is warm editorial-brutalist, not generic SaaS: soft paper background, strong ink outlines, restrained peach accent, and offset shadows for featured surfaces.
- Keep the primary palette anchored to:
  - paper `#fffdf9`
  - ink `#0d0d0c`
  - warm accent `#f4ded0`
  - accent text `#9d6550`
  - hover ink `#2a2927`
- Use Tailwind v4 utilities and the CSS variables defined in `app/globals.css`.
- Use `cn` from `lib/utils.ts` for conditional class names.
- Reuse `components/ui` primitives for buttons, inputs, labels, fields, cards, separators, and OTP inputs.
- Use lucide-react icons for actions when an icon improves scanability.
- Match the existing visual language: focused, study-oriented, editorial, tactile, responsive, and accessible.
- Prefer full-width section bands with constrained inner containers such as `max-w-7xl`, `max-w-6xl`, or `max-w-5xl`. Alternate between light paper sections, white framed sections, and dark ink sections rather than stacking identical cards.
- Favor hard borders and square or lightly rounded frames for hero surfaces, cards, tiles, and mocks. Use offset shadow patterns like `shadow-[8px_8px_0_#0d0d0c]` or `shadow-[12px_12px_0_#0d0d0c]` for featured blocks instead of soft floating-card styling.
- Reserve pill rounding for navigational or CTA elements such as the header shell and primary action links. Do not apply large soft radii everywhere.
- Use backgrounds with atmosphere: warm top gradients, light grid textures, translucent white overlays, and dark sections with subtle borders. Avoid flat app-store gradients or purple/blue startup palettes.
- Typography should stay bold and compact with high-contrast headlines, normal tracking, and short uppercase eyebrow labels in the warm accent color. Do not introduce decorative display fonts that fight the existing mark and layout.
- Preserve the existing interaction pattern where chrome can shrink on scroll rather than disappear. For headers and persistent controls, prefer minimized, denser states over hiding important navigation.
- On mobile, collapse multi-column layouts into single-column stacks first, then into two-column grids only when content density still reads cleanly. Keep the same border/shadow language, but reduce offsets, padding, and decorative layers before removing structure entirely.
- When adapting desktop compositions for small screens, protect three things in order: readable headline width, comfortable tap targets, and intact framed surfaces. Do not let text wrap into awkward narrow columns or let offset-shadow decorations clip the viewport.
- Preserve keyboard accessibility, focus-visible styles, labels, semantic headings, and meaningful alt text.
- Check responsive behavior for new UI at mobile and desktop widths. Avoid text overlap, clipped controls, and layout shifts.

## Verification

- Run the relevant `package.json` script after changes:
  - `npm run lint` for TypeScript/React/style safety.
  - `npm run build` when touching routing, Next config, server/client boundaries, or other build-sensitive code.
- For visual changes, run the dev server and inspect the affected routes in a browser.
- If verification cannot be run, state exactly why and what risk remains.

## Git And File Hygiene

- Do not overwrite user changes. If the worktree is dirty, preserve unrelated edits.
- Do not edit generated files such as `next-env.d.ts` or `.next/**`.
- Keep imports tidy and use the `@/*` path alias where it matches existing code.
- Prefer small, reviewable commits or patches. Avoid broad formatting churn.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
