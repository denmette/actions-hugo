module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['<rootDir>/__tests__/node-compat/globals.js'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
