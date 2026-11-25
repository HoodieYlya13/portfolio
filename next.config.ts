import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: ["192.168.1.119"],
  experimental: {
    // Feedback attachments (see app/actions/feedback.ts); Vercel takes 4.5 MB per request.
    serverActions: { bodySizeLimit: "4mb" },
  },
};

export default nextConfig;
