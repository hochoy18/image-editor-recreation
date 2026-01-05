# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages, layouts, API routes, and server components.
- `components/`: Reusable UI components (PascalCase `.tsx`).
- `hooks/`: React hooks (camelCase `use*.ts`).
- `lib/`: Utilities, helpers, and types shared across the app.
- `public/`: Static assets served from `/` (e.g., `/favicon.ico`).
- `images/`: Sample/editor assets used during development.
- `styles/`: Global styles and Tailwind setup.

## Build, Test, and Development Commands
- Install: `pnpm i` (project uses `pnpm-lock.yaml`; yarn/npm also work).
- Dev server: `pnpm dev` → starts Next.js locally.
- Lint: `pnpm lint` → runs ESLint on the repo.
- Build: `pnpm build` → production build.
- Start: `pnpm start` → serve the production build.

## Coding Style & Naming Conventions
- Language: TypeScript; indentation: 2 spaces; avoid unused exports.
- Components: PascalCase file names (e.g., `ColorPicker.tsx`).
- Hooks: `use` prefix (e.g., `useCanvas.ts`).
- Routes (in `app/`): folder-based, kebab-case segments when user-facing.
- Styling: Tailwind CSS; prefer utility classes; keep class lists readable; use `clsx`/`tailwind-merge` when helpful.
- Linting: ESLint (`pnpm lint`); fix issues before commits.

## Testing Guidelines
- No test runner is configured yet. Recommended: Vitest + React Testing Library for unit tests and Playwright for e2e.
- Naming: `*.test.ts`/`*.test.tsx` co-located with source or under `__tests__/`.
- Coverage: target 80%+ for core logic in `lib/` and critical components.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (e.g., `feat: add crop tool`, `fix(ui): correct canvas scaling`).
- PRs: include a clear description, linked issue, test plan, and screenshots/GIFs for UI changes.
- CI expectations: build and lint must pass; add/update tests when behavior changes.

## Security & Configuration Tips
- Secrets: use `.env.local`; never commit credentials. Use `NEXT_PUBLIC_*` only for safe, client-visible values.
- Next.js config: adjust `next.config.mjs` for images, headers, or experimental flags as needed.

## Agent Notes (Codex)
- If using Codex skills, prefer `skill-creator`/`skill-installer` and follow each skill’s `SKILL.md`. Keep context small and reuse scripts/assets when present.
