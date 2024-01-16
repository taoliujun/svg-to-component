module.exports = {
    extends: ['@taoliujun/eslint-config'],
    overrides: [
        {
            // page store components are temporarily unused
            files: ['./packages/*/src/index.ts'],
            rules: {
                'import/no-unused-modules': ['off'],
                'import/no-default-export': ['off'],
            },
        },
    ],
};
