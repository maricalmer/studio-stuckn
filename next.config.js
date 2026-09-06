const deployedStudioOrigin = "https://ronjastucken.sanity.studio";
const developmentStudioOrigin = "http://localhost:3333";
const frameAncestors = [deployedStudioOrigin, developmentStudioOrigin];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify's on-demand IPX image optimizer currently cannot load its Linux
  // sharp/libvips binary. Our local assets are already WebP, so serving them
  // directly keeps images available while avoiding that failing runtime.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${frameAncestors.join(" ")}`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
