import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development', // Auto-bypass optimization in dev
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Helps Turbopack handle the Sanity library overhead
  transpilePackages: ["next-sanity", "@sanity/image-url"],
};

export default nextConfig;