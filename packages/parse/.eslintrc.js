const path = require('path');

module.exports = {
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parserOptions: { project: path.resolve(__dirname, './tsconfig.json') },
        },
    ],
};
