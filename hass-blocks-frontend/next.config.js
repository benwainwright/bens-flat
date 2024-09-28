// @ts-check

const withBasePath =
  process.env["NODE_ENV"] === "production"
    ? { assetPrefix: "/bdd5e753_hass-blocks-frontend/ingress" }
    : {};

/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "dist",
  ...withBasePath,
};

module.exports = nextConfig;
