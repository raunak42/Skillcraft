/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui", "db", "store", "auth", "zod-validation", "types"],
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
};

export default nextConfig;
