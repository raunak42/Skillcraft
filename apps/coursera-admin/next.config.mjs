/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
