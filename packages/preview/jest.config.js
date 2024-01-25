const path = require('path');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    testMatch: ['**/*.test.tsx?'],

    snapshotResolver: path.resolve(__dirname, '../../', './jest/config/snapshotResolver.js'),
};
