import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: false,
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "web.pln.co.id",
        pathname: "/statics/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.therobotreport.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://video-server.agus-darmawan.com",
        pathname: "/**",
      },
    ],
    domains: ["video-server.agus-darmawan.com"],
  },
};

export default withPWA(nextConfig);
