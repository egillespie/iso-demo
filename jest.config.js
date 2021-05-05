// https://jestjs.io/docs/configuration
module.exports = {
  testMatch: ['**/tests/unit/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/scripts/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/const/'],
  coverageDirectory: 'reports/unit-coverage'
}
