---
name: deploy-github-pages
description: Configure and deploy Astro/Vite-style static sites to GitHub Pages with GitHub Actions. Use when a user asks to publish, deploy, or host a repo on GitHub Pages, or when setting base paths/site URLs for project pages.
---

# Deploy GitHub Pages

## Goal

Publish a static site from this repository to GitHub Pages using GitHub Actions.

## Workflow

1. Confirm build command produces static output (`dist/` by default).
2. Ensure framework config supports Pages subpath deploys:
   - `site` from env (`SITE_URL`)
   - `base` from env (`BASE_PATH`) with local fallback `/`
3. Add workflow at `.github/workflows/deploy.yml`:
   - Trigger: push to default branch + `workflow_dispatch`
   - Permissions: `contents: read`, `pages: write`, `id-token: write`
   - Build job: checkout, setup node, `npm ci`, `npm run build`
   - Pass env:
     - `SITE_URL: https://${{ github.repository_owner }}.github.io`
     - `BASE_PATH: /${{ github.event.repository.name }}`
   - Upload `dist` via `actions/upload-pages-artifact`
   - Deploy via `actions/deploy-pages`
4. Document setup in `README.md`:
   - Enable Pages -> Source: GitHub Actions
   - Expected URL: `https://<owner>.github.io/<repo>/`
   - Common troubleshooting notes (base-path 404s, action failures)
5. Validate locally with `npm run build`.

## Validation checklist

- [ ] Workflow file exists and is syntactically correct.
- [ ] Build passes locally.
- [ ] `README.md` contains first-publish steps.
- [ ] Static assets load correctly under repo subpath.

## Notes

- For user/org Pages repos (`<owner>.github.io`), set `BASE_PATH` to `/`.
- If branch name is `main`, update workflow trigger accordingly.
