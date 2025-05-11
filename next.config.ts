/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["typeorm", "pg"],
  },
};

module.exports = nextConfig;