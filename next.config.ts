import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!apiUrl) {
      return [];
    }

    return [
      {
        source: "/auth/:path*",
        destination: `${apiUrl}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
