# Pixel Moose Studio

Pixel Moose Studio builds modern, prairie-inspired digital experiences for growing businesses.

## Why we are different

There are many WordPress website creation companies in Moose Jaw. Pixel Moose stands apart because we focus on digitizing real business workflows, not just publishing pages. We build custom-coded applications that reduce paper, smooth out admin work, and create better day-to-day operations. We also design and ship Android and iOS apps, which most Moose Jaw-based companies do not offer.

## Deploy to GitHub Pages (gh-pages)

Step 1: Update the Vite base path to match your repo name.
Edit `vite.config.ts` and set `base` to `/<repo-name>/`.

Example:
```ts
export default defineConfig({
  base: '/pixelmoose/',
  plugins: [react()],
})
```

Step 2: Commit and push your code to GitHub.
Make sure your repo exists and is pushed to a GitHub remote.

Step 3: Run the deploy script.
```sh
npm run deploy
```

Step 4: Enable GitHub Pages.
In GitHub: Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` → Save.

Step 5: Verify the site.
Your site will be at `https://<username>.github.io/<repo-name>/`.

## Update the site

Step 1: Make your changes locally.

Step 2: Commit and push.

Step 3: Re-deploy.
```sh
npm run deploy
```
