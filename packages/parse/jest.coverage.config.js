const path = require('path');
const baseConfig = require('./jest.config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    ...baseConfig,

    testMatch: ['**/*.test.ts', '!**/*.snap.test.ts'],

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!**/*.test.ts', '!src/template/**'],
    coverageDirectory: path.resolve(__dirname, '../../', 'reports/jest/parse'),
    coverageThreshold: { global: { lines: 90, branches: 50 } },
    coverageReporters: ['html'],
};
