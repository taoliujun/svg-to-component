const path = require('path');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    testMatch: ['**/*.test.ts'],

    snapshotResolver: path.resolve(__dirname, '../../', './jest/config/snapshotResolver.js'),
};
