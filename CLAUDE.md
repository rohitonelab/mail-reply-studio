# Project: Vite + React + TypeScript SPA on Netlify

## Stack
- Vite 5 (build tool)
- React 18 with TypeScript
- Tailwind CSS 3 + shadcn/ui components
- React Router DOM (client-side routing)
- Deployed on Netlify

## Build
- Install: `npm install`
- Build: `npm run build` (outputs to `dist/`)
- Dev: `npm run dev` (port 8080)
- Test: `npm run test`
- Lint: `npm run lint`

## Deployment Checklist (ALWAYS verify before finishing any task)
1. **Build succeeds** — Run `npm run build` and confirm it completes with no errors.
2. **netlify.toml exists** — Must be present at the repo root with correct build command (`npm run build`), publish directory (`dist`), and SPA redirect (`/* /index.html 200`).
3. **No broken imports** — Check that all imported files/modules actually exist (especially after renaming or deleting files).
4. **Environment variables** — If any new env vars are introduced, note them clearly so they can be added in the Netlify dashboard.
5. **TypeScript compiles** — Ensure there are no type errors that would block the build.

## Common Deployment Issues
- **404 on page refresh**: Missing SPA redirect rule in `netlify.toml` or `_redirects`. The `netlify.toml` in this repo handles it.
- **Build failure**: Usually a TypeScript error or missing dependency. Always run `npm run build` to verify.
- **Blank page**: Check the browser console for import errors — often caused by wrong paths after refactoring.
