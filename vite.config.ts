import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [
      ["./src/modules/org/controllers/**", "prisma"],
      ["./src/modules/pet/controllers/**", "prisma"],
    ],
  },
});
