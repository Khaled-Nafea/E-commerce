import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-brands/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "/Route-Academy-categories/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
