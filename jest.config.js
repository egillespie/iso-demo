// https://jestjs.io/docs/configuration
export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/unit/**/*.test.mjs'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/scripts/**/*.js',
    'src/scripts/**/*.mjs'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/const/'],
  coverageDirectory: 'reports/unit-coverage',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs']
}
