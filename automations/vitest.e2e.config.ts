import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      POST_RELEASE: "true",
    },
    globals: true,
    testTimeout: 30 * 1000,
    setupFiles: ["./src/test-support/setup-tests-e2e.ts"],
    globalSetup: "./src/test-support/e2e-global-setup.ts",
    include: ["src/tests/**/*.spec.ts"],
  },
});
