import { defineConfig } from "vitest/dist/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './setEnvVars.ts'
  },
})