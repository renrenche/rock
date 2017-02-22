/**
 * Webpack config for production
 */
module.exports = require('./webpack.make')({
    DEV: false,
    BUILD: true,
});
