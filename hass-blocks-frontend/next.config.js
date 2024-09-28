// @ts-check

const { readFileSync } = require("fs");

const withBasePath =
  process.env["NODE_ENV"] === "production"
    ? { assetPrefix: readFileSync("ingress-entry", "utf-8") }
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
