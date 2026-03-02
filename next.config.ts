import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gs2sg87dcifti8xw.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
