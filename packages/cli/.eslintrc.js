module.exports = {
    extends: ['@taoliujun/eslint-config'],
    parserOptions: { tsconfigRootDir: __dirname },
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
