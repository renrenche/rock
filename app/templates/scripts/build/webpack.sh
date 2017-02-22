#!/bin/bash

gulp clean
NODE_ENV=production webpack --verbose --progress --colors --display-modules --display-error-details --config webpack/webpack.build.js
gulp deploy
