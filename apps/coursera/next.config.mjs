import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental:{
  //   serverActions:true
  // },
  transpilePackages: [
    "ui",
    "db",
    "state-store",
    "auth",
    "zod-validation",
    "types",
    "helpers",
  ],
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
};

export default withNextVideo(nextConfig);