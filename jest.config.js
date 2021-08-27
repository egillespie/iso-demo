// https://jestjs.io/docs/configuration
export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/unit/**/*.test.mjs'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
  collectCoverage: true,
  collectCoverageFrom: ['scripts/**/*.mjs'],
  coveragePathIgnorePatterns: ['/node_modules/', '/const/'],
  coverageDirectory: 'reports/unit-coverage'
}
