module.exports = {
    parser: 'babel-eslint',
    plugins: [
        'react',
        'import',
        'html',
    ],
    extends: 'renrenche',
    env: {
        es6: true,
        browser: true,
        node: true,
        mocha: true,
    },
    globals: {
        define: true,
        DATA: true,
        __DEVELOPMENT__: true,
    },
};
