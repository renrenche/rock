module.exports = {
    parser: 'babel-eslint',
    plugins: [
        // supports extracting and linting the JavaScript inside *.vue files
        // https://github.com/BenoitZugmeyer/eslint-plugin-html
        'html',
        // React specific linting rules
        // https://github.com/yannickcr/eslint-plugin-react
        'react',
        // Static AST checker for accessibility rules on JSX elements.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y
        'jsx-a11y'
    ],
    // Extends eslint-config-airbnb-base
    // Rules for ES6+, requires eslint and eslint-plugin-import
    // https://www.npmjs.com/package/eslint-config-renrenche
    extends: 'renrenche',
    env: {
        es6: true,
        browser: true,
        node: true,
        mocha: true,
    },
    globals: {
        define: true,
        // Window.DATA for client usage
        DATA: true,
        __DEVELOPMENT__: true,
    },
    rules: {
        // Prevent React to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['error'],

        // Prevent variables used in JSX to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-uses-vars': 'error',
    }
};
