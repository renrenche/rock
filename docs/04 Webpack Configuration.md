## Webpack 配置说明

> 使用Rock生成的项目，支持ES6语法, React, Vue, Less, Css, 图片。同时为生产环境提供了代码压缩，图片压缩，为开发环境提供了热加载，自动刷新，source-map的配置。

> 本篇将对这些配置做简单说说明。

1. <a href="#提供的配置">提供的配置</a>
2. <a href="#说明">说明</a>

### <a name="提供的配置">提供的配置</a>
**Javascript**

* Babel
* React
* Vue

**Stylesheet**

* Less
* CSS
* Url ('./a.png')
* Autoprefixer

**Image / Font**

* .jpe?g / .png / .gif / .svg
* .woff / .ttf / .eot / .svg

**Production**

* UglifyJs, Cssnano
* Image Optimize
* Filename with Hash
* CDN Prefiex

**Development**

* eslint

**Debug**

* Source-map
* Hot-Replacement
* Live-Realod


### <a name="说明">说明</a>
**生产环境编译后的文件有以下特点：**

* 文件名追加Hash值，以便资源更新。如[name]-[chunkhash:10].js。
* 资源的地址添加CDN地址作为前缀，CDN地址配置于 `config/` 中。


**开发环境编译后的文件有以下特点：**

* 资源的地址添加本地启动 webpack-dev-server 服务的 IP，Port 作为前缀。

**Bael的配置**

* babel-preset-es2015
* babel-preset-stage-0
* babel-preset-react
* Plugin: transform-object-assign

**Css 文件的拆分**

使用webpack plugin: Extract-text-webpack-plugin，将JS中引入的样式分离到单独的CSS文件。


**Autoprefiexer的配置**

兼容到 `browsers: ['>1%', 'last 2 versions', 'iOS 7']`



提供的配置                  | 所用的插件
---------------------------|----------------------------------------------------------
babel                      |[babel-loader](http://webpack.github.io/docs/usage.html#transpiling-es2015-using-babel-loader),[babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/),[babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/),[transform-object-assign](https://babeljs.io/docs/plugins/transform-object-assign/)
react                      |[babel-loader](http://webpack.github.io/docs/usage.html#transpiling-es2015-using-babel-loader),[babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/),[babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/),[transform-object-assign](https://babeljs.io/docs/plugins/transform-object-assign/),[babel-preset-react](https://babeljs.io/docs/plugins/preset-react/)
vue                        |[babel-loader](http://webpack.github.io/docs/usage.html#transpiling-es2015-using-babel-loader),[babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/),[transform-object-assign](https://babeljs.io/docs/plugins/transform-object-assign/),[vue-style-loader](https://github.com/vuejs/vue-style-loader)
less                       |[style-loader](http://webpack.github.io/docs/stylesheets.html#embedded-stylesheets), [css-loader](http://webpack.github.io/docs/stylesheets.html#embedded-stylesheets), [postcss-loader](https://github.com/postcss/postcss-loader), [less-loader](https://github.com/webpack-contrib/less-loader),[autoprefixer](https://github.com/postcss/autoprefixer),[Extract-text-webpack-plugin](http://webpack.github.io/docs/stylesheets.html#separate-css-bundle)
css                        |[style-loader](http://webpack.github.io/docs/stylesheets.html#embedded-stylesheets), [css-loader](http://webpack.github.io/docs/stylesheets.html#embedded-stylesheets), [postcss-loader](https://github.com/postcss/postcss-loader), [less-loader](https://github.com/webpack-contrib/less-loader),[autoprefixer](https://github.com/postcss/autoprefixer),[Extract-text-webpack-plugin](http://webpack.github.io/docs/stylesheets.html#separate-css-bundle)
url('./a.png')             |[url-loader](http://webpack.github.io/docs/using-loaders.html#query-parameters)
Autoprefixer               |[autoprefixer](https://github.com/postcss/autoprefixer)
.jpe?g / .png / .gif / .svg|[url-loader](http://webpack.github.io/docs/using-loaders.html#query-parameters),[image-weback-loader](http://webpack.github.io/docs/list-of-plugins.html#imageminplugin)
.woff / .ttf / .eot / .svg |[url-loader](http://webpack.github.io/docs/using-loaders.html#query-parameters),[file-loader](https://github.com/webpack-contrib/file-loader)
UglifyJs                   |[UglifyJsPlugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)
CssMinify                  |[cssnano](http://cssnano.co/)
Image Optimize             |[image-weback-loader](http://webpack.github.io/docs/list-of-plugins.html#imageminplugin)
Filename with Hash         |[url-loader](http://webpack.github.io/docs/using-loaders.html#query-parameters)
CDN Prefiex                |[assets-webpack-plugin](https://github.com/kossnocorp/assets-webpack-plugin)
eslint                     |[eslint-loader](https://github.com/MoOx/eslint-loader)
Source-map                 |[devtool配置项](https://webpack.github.io/docs/configuration.html#devtool)
Hot-Replacement            |[HotModuleReplacementPlugin](http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin)
Live-Realod                |[webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli),[webpack-livereload-plugin](https://github.com/statianzo/webpack-livereload-plugin)
