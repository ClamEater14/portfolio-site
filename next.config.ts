import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.caleblamcodes.dev",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
