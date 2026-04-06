import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  // Set Turbopack root for monorepo workspace
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
