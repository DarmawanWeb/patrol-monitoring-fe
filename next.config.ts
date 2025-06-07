import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web.pln.co.id",
        port: "",
        pathname: "/statics/uploads/**",
      },
    ],
  },
};

export default nextConfig;
