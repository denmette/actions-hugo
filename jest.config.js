module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^node:crypto$': '<rootDir>/__tests__/node-compat/crypto.js',
    '^node:events$': '<rootDir>/__tests__/node-compat/events.js',
    '^node:stream$': '<rootDir>/__tests__/node-compat/stream.js',
    '^node:util$': '<rootDir>/__tests__/node-compat/util.js'
  },
  setupFiles: ['<rootDir>/__tests__/node-compat/globals.js'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
