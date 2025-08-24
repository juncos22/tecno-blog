import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nfnrdptnxaqucbqcckqo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      new URL("https://lh3.googleusercontent.com/a/**"),
    ],
  },
};

export default nextConfig;
