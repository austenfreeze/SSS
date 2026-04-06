import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    root: resolve(__dirname, ".."),
  },
};

export default nextConfig;
