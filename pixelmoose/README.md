# Pixel Moose Studio

Custom software for small businesses — a small, local, woman-owned studio in Moose Jaw, Saskatchewan, hand-coded by Ami.

Built with Next.js as a static export, with light/dark mode, Open Graph image, sitemap, robots.txt and LocalBusiness structured data.

## Develop

```sh
npm install
npm run dev
```

Edit copy and projects in `lib/content.ts`. Add project screenshots to `public/work/<slug>/`.

## Deploy to GitHub Pages

```sh
npm run deploy
```

This builds to `out/` and pushes it to the `gh-pages` branch with the `pixelmoose.ca` CNAME and a `.nojekyll` file (needed so GitHub Pages serves the `_next/` folder).

## Contact

pixelmoose.development@gmail.com
