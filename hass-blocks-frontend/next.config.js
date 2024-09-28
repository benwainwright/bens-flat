// @ts-check

const { readFileSync } = require("fs");

const withBasePath =
  process.env["NODE_ENV"] === "production"
    ? { assetPrefix: readFileSync("ingress-entry", "utf-8") }
    : {};

/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "dist",
  ...withBasePath,
};

console.log("nextConfig", nextConfig);

module.exports = nextConfig;
