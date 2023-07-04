import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: ['src/**/*.{ts,tsx}'],
    setupFiles: './tests/setup.js',
  },
})
