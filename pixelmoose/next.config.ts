import type { NextConfig } from 'next'

// Static export so the site keeps deploying to GitHub Pages.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
