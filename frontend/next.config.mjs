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
    root: "..",
  },
};

export default nextConfig;
