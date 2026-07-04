# Upload cour.software to GitHub

## Quick option — use the zip

Upload **`cour-github-upload.zip`** to your GitHub repo (drag into the web UI, or extract and push).

## What's included

- `src/` — pages, components, app data
- `public/` — screenshots, videos, CNAME (`cour.software`)
- `content/` — App Store copy and policy drafts
- `.github/workflows/` — auto-deploy to GitHub Pages
- Config: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, etc.

## What's excluded (do not upload)

- `node_modules/`
- `.next/`
- `out/`
- `.git/`
- `.env.local`
- `.cursor/`
- Old zips (`cour-site-deploy.zip`, etc.)

## After upload

1. Go to repo **Settings → Pages**
2. Source: **GitHub Actions**
3. Custom domain: **`cour.software`**
4. Wait for the "Deploy to GitHub Pages" workflow to finish
5. Test: https://cour.software/starhook/privacy

## Recreate the zip locally

```bash
cd ~/Projects/company-site
zip -r cour-github-upload.zip \
  src public content .github \
  package.json package-lock.json \
  next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs \
  next-env.d.ts README.md CNAME \
  -x "*.DS_Store"
```
