import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: ['src/**/*.{ts,tsx}'],
  },
})
