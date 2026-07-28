/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify's on-demand IPX image optimizer currently cannot load its Linux
  // sharp/libvips binary. Our local assets are already WebP, so serving them
  // directly keeps images available while avoiding that failing runtime.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
