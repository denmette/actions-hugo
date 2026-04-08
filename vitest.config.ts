import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['lib/**'],
      include: ['src/**/*.ts'],
      provider: 'istanbul'
    },
    environment: 'node',
    fileParallelism: false,
    globals: false,
    include: ['__tests__/**/*.test.ts'],
    reporters: ['verbose'],
    setupFiles: ['./__tests__/node-compat/globals.ts'],
    testTimeout: 30000
  }
});
