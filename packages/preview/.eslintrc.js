module.exports = {
    root: true,
    extends: ['@taoliujun/eslint-config/react'],
    parserOptions: { tsconfigRootDir: __dirname },

    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['/config/**/*'],
            },
        ],
        'react/display-name': ['off'],
    },

    overrides: [
        {
            files: ['./config/**/*.ts'],
            rules: {
                'max-lines-per-function': ['off'],
                'no-console': ['off'],
            },
        },
        {
            files: ['./src/pages/!(components)/index.tsx', './src/pages/!(components)/!(components)/index.tsx'],
            rules: {
                'import/no-default-export': ['off'],
            },
        },
        {
            files: [
                './src/service/**/*.ts',
                './src/components/*/index.tsx',
                './src/pages/!(components)/index.tsx',
                './src/pages/!(components)/!(components)/index.tsx',
            ],
            rules: {
                'import/no-unused-modules': ['off'],
            },
        },
        {
            files: ['./src/**/*.tsx'],
            rules: {
                'import/order': [
                    'error',
                    {
                        pathGroups: [
                            { pattern: '../../**', group: 'type', position: 'after' },
                            { pattern: '../**', group: 'type', position: 'after' },
                            { pattern: './**', group: 'type', position: 'after' },
                        ],
                    },
                ],
            },
        },
    ],
};
