import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "patrol-api.agus-darmawan.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
