const ip = require('ip');
const config = require('config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.dev.js');

// TODO: hot reload not work
// http://webpack.github.io/docs/webpack-dev-server.html#hot-mode
// https://github.com/gaearon/react-hot-loader/issues/141
for (const key in webpackConfig.entry) {
    webpackConfig.entry[key].unshift(`webpack-dev-server/client?http://localhost:${config.ports.assets}/`, 'webpack/hot/dev-server');
}

const compiler = webpack(webpackConfig);

const host = ip.address();
const port = config.ports.assets;
const server = new WebpackDevServer(compiler, {
    // contentBase: `//${host}:${port}`,
    publicPath: webpackConfig.output.publicPath,

    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    hot: true,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "**" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    proxy: {
        '*': `localhost://${host}:${config.ports.server}`,
    },

    // Set this if you want to enable gzip compression for assets
    compress: true,

    // don’t output anything to the console.
    quiet: false,

    // suppress boring information.
    noInfo: false,

    // no watching, compiles on request (cannot be combined with --hot).
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    // silence output
    // Reference: https://github.com/webpack/webpack/issues/1191
    stats: {
        colors: true,
        hash: false,
        chunks: false,
        errors: true,
        errorDetails: true,
    },
});

server.listen(port, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  Webpack development server listening on port %s', port);
    }
});
