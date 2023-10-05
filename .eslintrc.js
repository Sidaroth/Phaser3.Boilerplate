module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', './scripts/eslint/index.js'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
};
