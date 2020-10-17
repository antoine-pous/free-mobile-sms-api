// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true
  , coverageDirectory: "coverage"
  , coverageProvider: "v8"
  , testEnvironment: "node"
  , transform:  {
    "\\.(ts)$": "ts-jest"
  }
};
