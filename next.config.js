/** @type {import('next').NextConfig} */
const nextConfig = {
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
    minimumCacheTTL: 60
  },
};

module.exports = nextConfig;
