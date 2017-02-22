const ip = require('ip');
const config = require('config');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig(options) {
    /**
     * Environment type
     * BUILD is for generating minified builds
     */
    const BUILD = !!options.BUILD;
    const DEV = !!options.DEV;

    /**
     * Configuration
     * Reference: https://webpack.js.org/concepts/configuration/
     * This is the object where all configuration gets set
     */
    const webpackConfig = {};

    /**
     * Entry
     * Reference: https://webpack.js.org/concepts/entry-points/
     * As Multi Page Application
     */
    const entries = {};
    glob.sync('./client/*').forEach(function (filepath) {
        const dirName = path.basename(filepath);
        entries[dirName] = [path.resolve(__dirname, '../', filepath)];
    });
    webpackConfig.entry = entries;

    /**
     * Output
     * Reference: https://webpack.js.org/concepts/output/
     */
    webpackConfig.output = {
        // filename for entry points
        // Only add file hash in build mode
        filename: BUILD ? '[name]-[chunkhash:10].js' : '[name].js',

        // filename for non-entry points
        chunkFilename: BUILD ? 'chunk/[name]-[chunkhash:10].js' : 'chunk/[name].js',

        // Absolute path of output directory
        path: path.resolve(__dirname, '../public/dist/rock'),
        publicPath: BUILD ? `${config.cdn.domain}/rock/dist/` : `//${ip.address()}:${config.ports.assets}/dist/rock/`,
    };

    /**
     * Devtool
     * Reference: https://webpack.js.org/configuration/devtool/
     * control if and how Source Maps are generated
     */
    if (DEV) {
        webpackConfig.devtool = 'source-map';
    }

    /**
     * Loaders
     * Reference: https://webpack.js.org/concepts/loaders/
     * functions that transform resource file to new source
     */
    webpackConfig.module = {
        rules: [{
            /**
             * loader: babel-loader
             * Reference: http://babeljs.io/docs/setup/#installation
             */
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'],
                plugins: ['transform-object-assign'],
            },
            exclude: [/node_modules/, /client\/common\/libs/],
        }, {
            /** loader: vue-loader
             * Reference: http://vue-loader.vuejs.org/en/
             */
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader?presets[]=es2015&plugins[]=transform-object-assign',
                    css: ExtractTextPlugin.extract({
                        use: `css-loader?minimize=${!!BUILD}`,
                        fallback: 'vue-style-loader',
                    }),
                    less: ExtractTextPlugin.extract('css!less'),
                },
            },
        }, {
            // loader: style-loader, css-loader, postcss-loader
            test: /\.css/,
            /** extract-text-webpack-plugin: move require('.css') in entry chunks to seperate css file
             * Reference: https://github.com/webpack/extract-text-webpack-plugin
             */
            loader: ExtractTextPlugin.extract({
                /** style-loader: add css to DOM by injecting a <style> tag
                 * Reference: https://github.com/webpack/style-loader
                 */
                fallback: 'style-loader',
                use: [{
                    /** css-loader: @import and url() are interpreted like @import and resolved
                     * Reference: https://github.com/webpack-contrib/css-loader
                     */
                    loader: 'css-loader',
                    options: { importLoaders: 1, minimize: !!BUILD },
                }, {
                    /** postcss-loader: transform styles
                     * Reference: https://github.com/postcss/postcss-loader
                     */
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            /** autoprefixer
                             * Reference: https://github.com/postcss/autoprefixer
                             * add prefixes to css rules according to "Browserslist"
                             */
                            autoprefixer({ browsers: ['>1%', 'last 2 versions', 'iOS 7'] }),
                        ]
                    },
                }],
            }),
        }, {
            // loader: style-loader, css-loader, postcss-loader, less-loader
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: { importLoaders: 1, minimize: !!BUILD },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer({
                                browsers: ['>1%', 'last 2 versions', 'iOS 7'],
                            }),
                        ]
                    },
                }, 'less-loader'],
            }),
        }, {
            /** url-loader
             * Reference: https://github.com/webpack-contrib/url-loader
             * Copy files to output with rename usding the hash
             * If the file is smaller tha 1000 bytes, will return a Data Url
             */
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
                'url-loader?limit=1000&name=./image/[name]-[hash:10].[ext]',
                /** image-webpack-loader
                 * Reference: https://github.com/tcoopman/image-webpack-loader
                 * load and optimize with mozjpeg for .jpg and pngquant for .png
                 */
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: { quality: 65 },
                        pngquant: { quality: '65-90', speed: 4 },
                    },
                },
            ],
        }, {
            test: /\.woff(\?t=\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./image/[name]-[hash:10].[ext]',
        }, {
            test: /\.woff2(\?t=\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./image/[name]-[hash:10].[ext]',
        }, {
            test: /\.ttf(\?t=\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./image/[name]-[hash:10].[ext]',
        }, {
            test: /\.eot(\?t=\d+)?$/,
            loader: 'file-loader?name=./image/[name]-[hash:10].[ext]',
        }, {
            test: /\.svg(\?t=\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        }],
    };

    if (DEV) {
        /** eslint-loader
         * Reference: https://github.com/MoOx/eslint-loader
         */
        webpackConfig.module.rules.unshift({
            test: /\.(js|jsx|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: [/node_modules/, /client\/common\/libs/],
            options: { configFile: '.eslintrc.js' },
        });
    }

    /**
     * Plugins
     * Reference: https://webpack.js.org/concepts/plugins/
     * List of Plugins: http://webpack.github.io/docs/list-of-plugins.html
     * A webpack plugin is a Javascript object with an apply property, can be called by the webpack compiler
     * Do anything else that a loader cannot do
     */
    webpackConfig.plugins = [
        /**
         * Plugin: assets-webpack-plugin
         * Description: emits a JSON file(webpack-assets.json) with assets path
         * Reference: https://github.com/kossnocorp/assets-webpack-plugin
         */
        new AssetsPlugin({
            prettyPrint: true,

            // path where to save the created JSON file
            path: path.resolve(__dirname, '../'),
        }),
    ];

    if (DEV) {
        webpackConfig.plugins.push(
            /**
             * Plugin: extract-text-webpack-plugin
             * Description: extract text form bundle into a file, especially move require('style.less') into a seperate css file
             * Reference: https://github.com/webpack-contrib/extract-text-webpack-plugin
             */
            new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),

            /**
             * Plugin: optimize.CommonsChunkPlugin
             * Reference: http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             */
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', chunks: Object.keys(entries) }),

            /**
             * Plugin: HotModuleReplacementPlugin
             * Description: enable hot module replacement
             * Reference: http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
             */
            new webpack.HotModuleReplacementPlugin(),

            /**
             * Plugin: LiveReloadPlugin
             * Description: enable reload client
             * Reference: https://github.com/statianzo/webpack-livereload-plugin
             */
            new LiveReloadPlugin({
                appendScriptTag: true,
                port: config.ports.livereload,
            })
        );
    }

    if (BUILD) {
        const uglifyCompressOptions = {
            sequences: true,        // join consecutive statemets with the “comma operator”
            properties: true,       // optimize property access: a["foo"] → a.foo
            dead_code: true,        // discard unreachable code
            drop_debugger: true,    // discard “debugger” statements
            unsafe: false,          // some unsafe optimizations (see below)
            conditionals: true,     // optimize if-s and conditional expressions
            comparisons: true,      // optimize comparisons
            evaluate: true,         // evaluate constant expressions
            booleans: true,         // optimize boolean expressions
            loops: true,            // optimize loops
            unused: true,           // drop unused variables/functions
            hoist_funs: true,       // hoist function declarations
            hoist_vars: false,      // hoist variable declarations
            if_return: true,        // optimize if-s followed by return/continue
            join_vars: true,        // join var declarations
            cascade: true,          // try to cascade `right` into `left` in sequences
            side_effects: true,     // drop side-effect-free statements
            warnings: true,         // warn about potentially dangerous optimizations/code
            global_defs: {          // global definitions
                __DEVELOPMENT__: false,
            },
        };
        webpackConfig.plugins.push(
            /**
             * Plugin: clean-webpack-plugin
             * Reference: https://github.com/johnagan/clean-webpack-plugin
             */
            new CleanPlugin(['public'], { root: path.resolve(__dirname, '../') }),

            /**
             * Plugin: Optimize
             * Reference: http://webpack.github.io/docs/list-of-plugins.html#optimize
             */
            new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: uglifyCompressOptions }),

            new ExtractTextPlugin({ filename: 'css/[name]-[contenthash:10].css', allChunks: true })
        );
    }

    /**
     * Resolve
     * Reference: https://webpack.js.org/configuration/resolve/
     * change how modules ares resolved
     */
    webpackConfig.resolve = {
        // modules: absolute path will only search in below directory.
        // e.g. client/ takes precedences over node_modules/
        modules: [path.resolve(__dirname, '../client'), 'node_modules'],

        // alias: create aliases to import or require modules more easily
        // e.g. import 'jquery' instead of import '../common/libs/jquery.js'
        alias: {
            jquery: 'common/libs/jquery.js',
        },
    };

    return webpackConfig;
};
