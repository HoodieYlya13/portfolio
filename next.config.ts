import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: ["192.168.1.119"],
};

export default nextConfig;
