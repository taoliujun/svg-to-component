/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    testMatch: ['**/*.test.ts'],

    snapshotResolver: './jest/config/snapshotResolver.js',
};
