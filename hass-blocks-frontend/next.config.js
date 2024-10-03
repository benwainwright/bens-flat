// @ts-check

const { readFileSync } = require("fs");

const getConfig = () => {
  return JSON.parse(readFileSync("config-build", "utf-8"));
};

const withBasePath =
  process.env["NODE_ENV"] === "production"
    ? {
        assetPrefix: getConfig().frontendIngressUrl,
      }
    : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...withBasePath,
};

module.exports = nextConfig;
