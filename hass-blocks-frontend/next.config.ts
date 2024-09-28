import type { NextConfig } from "next";

const withBasePath =
  process.env["NODE_ENV"] === "production"
    ? { basePath: "/bdd5e753_hass-blocks-frontend/ingress" }
    : {};

const nextConfig: NextConfig = {
  distDir: "dist",
  ...withBasePath,
};

export default nextConfig;
