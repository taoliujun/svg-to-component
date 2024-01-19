module.exports = {
    extends: ['@taoliujun/eslint-config'],
    overrides: [
        {
            files: ['./src/index.ts'],
            rules: {
                'import/no-unused-modules': ['off'],
                'import/no-default-export': ['off'],
            },
        },
    ],
};
