import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.hubspot.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "www.siteground.com" },
      { protocol: "https", hostname: "www.bluehost.com" },
      { protocol: "https", hostname: "fiverr-res.cloudinary.com" },
      { protocol: "https", hostname: "assets-global.website-files.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "logos-world.net" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "freebiehive.com" },
      { protocol: "https", hostname: "e7.pngegg.com" },
      { protocol: "https", hostname: "cdn-1.webcatalog.io" },
      { protocol: "https", hostname: "logowik.com" },
    ],
  },
};

export default nextConfig;
