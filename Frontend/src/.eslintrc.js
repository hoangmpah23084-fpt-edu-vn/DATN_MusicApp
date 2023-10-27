module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // Tùy chỉnh các quy tắc cho TypeScript ở đây
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
