const baseConfig = require('./jest.config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    ...baseConfig,

    testMatch: ['**/*.test.ts', '!**/*.snap.test.ts'],

    collectCoverage: true,
    collectCoverageFrom: ['packages/cli/src/**/*.ts', 'packages/parse/src/**/*.ts', '!**/*.test.ts'],
    coverageDirectory: 'reports/jest',
    coverageThreshold: { global: { lines: 90, branches: 50 } },
    coverageReporters: ['html'],
};
