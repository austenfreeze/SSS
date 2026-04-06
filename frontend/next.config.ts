import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  transpilePackages: ["next-sanity", "@sanity/image-url"],
  allowedDevOrigins: ["*.vercel.run"],
  turbopack: {
    root: "/vercel/share/v0-project",
  },
};

export default nextConfig;
