# closet-audit

`closet-audit` is an Astro + React static site. This repo is configured to build to `dist/` and deploy automatically to GitHub Pages from the `master` branch.

## Local development

```bash
npm install
npm run dev
```

Default dev URL: `http://localhost:4321`.

## Build output

Production build command:

```bash
npm run build
```

This generates a static site in `dist/`.

## GitHub Pages deployment (already configured)

This repository includes `.github/workflows/deploy.yml` which:

1. Runs on pushes to `master` (and manual trigger).
2. Installs dependencies with `npm ci`.
3. Builds with Astro.
4. Uploads `dist/` as the Pages artifact.
5. Deploys to GitHub Pages.

The build uses:

- `SITE_URL=https://<github-owner>.github.io`
- `BASE_PATH=/<repo-name>`

So the expected URL for this repo is:
`https://<your-github-username>.github.io/closet-audit/`

## First-time publish checklist

1. Push this repo to GitHub as `closet-audit`.
2. In GitHub, open `Settings` -> `Pages`.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `master` (or run the workflow manually from the Actions tab).
5. Wait for `Deploy to GitHub Pages` workflow to finish.
6. Open the published URL.

## Project commands

| Command           | Action |
| ---               | --- |
| `npm run dev`     | Start local development server |
| `npm run build`   | Build static site to `dist/` |
| `npm run preview` | Preview production build locally |

## Troubleshooting

- 404 or missing CSS/JS on Pages: confirm the repository name is `closet-audit`, or update `BASE_PATH` handling in the workflow/config.
- Pages not updating: check the latest Actions run logs for build/deploy errors.
- Wrong branch: workflow deploys from commits pushed to `master`.
