## Rock

> Rock is a Javascript fullstack generator equipped with following techs: Express, Ejs, Webpack and Gulp. You can choose React, Vue, or jQuery for client frameworks as you wish because webpack configuration has been ready for that.

Rock是一个Express + Webpack `脚手架`。可生成简单，稳定的Node服务。

提供了基础的 Server架构，详尽的 Webpack配置，最佳实践，使用者可自由选择前端框架如 React, Vue。

上手简单，文档详尽，开发者友好。

### 演示
![Get Start](/docs/image/rock-get-start.gif?raw=true)

### 支持配置
* Build Systems
	* [Webpack](https://webpack.js.org/) (main)
	* [Gulp](http://gulpjs.com/)
* Testing
	* [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/)
* Client
	* Scripts: Javascript ([Babel](https://babeljs.io/))
	* Module Systems: [Webpack](https://webpack.js.org/)
	* Markup: [EJS](http://ejs.co/)
	* Stylesheets: [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS), [Less](http://lesscss.org/)
	* Static-Files-Server: [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
* Server
	* Scripts: Javascript (no [Babel](https://babeljs.io/))
	* Framework: [Express](http://expressjs.com/)
* Development
	* Lint: [Eslint](http://eslint.org/)
	* Debugger: [Source-map](https://webpack.js.org/guides/development/#source-maps)
	* Auto-Refresh: [Nodemon](https://github.com/remy/nodemon), [Livereload](https://github.com/statianzo/webpack-livereload-plugin)
* Production
	* Log: [Winston](https://github.com/winstonjs/winston), [Morgan](https://github.com/expressjs/morgan)
	* Optimize: [UglifyJsPlugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin), [cssnano](http://cssnano.co/)
	* Compatibility: [Autoprefixer](https://github.com/postcss/autoprefixer)

### 使用方式
1. 安装 `yo` 和 `rock`

		npm install -g yo generator-rock

2. 使用rock生成一个项目

		yo rock

3. 启动服务

		npm run dev
4. 访问 `http://localhost:8081`

### 其他命令
* Client Side
	yo rock:component

### 开发文档
1. [Configuration vs. Definition](/docs/01%20Configuration%20vs.%20Definition.md)
2. [Directory](/docs/02%20Directory.md)
3. [Client Module System](/docs/03%20Client%20modules.md)
4. [Webpack Configuration](/docs/04%20Webpack%20Configuration.md)
5. [Effective Ops](r/docs/05%20Effective%20Ops.md)
6. [Tests](/docs/06%20Tests.md)
101. [Let's Rock](/docs/101%20Let's%20Rock.md)


### 项目示例
```
├── client
│   ├── common
│   │   ├── index.js
│   │   ├── libs
│   │   │   ├── jquery.js
│   │   │   ├── log.js
│   │   │   └── require.js
│   │   └── style.less
│   └── index
│       ├── index.js
│       └── style.less
├── config
│   ├── default.js
│   ├── development.js
│   └── production.js
├── gulpfile.js
├── index.js
├── package.json
├── scripts
│   ├── build
│   │   ├── jenkins.sh
│   │   └── release.sh
│   ├── crontab.sh
│   ├── deploy
│   │   ├── production.sh
│   │   └── test.sh
│   ├── deploy.sh
│   ├── process.production.json
│   └── test
│       ├── coverage.sh
│       └── unit.sh
├── server
│   ├── controllers
│   │   └── index.js
│   ├── server.js
│   └── views
│       ├── index.ejs
│       └── layout.ejs
├── webpack
│   ├── development.config.js
│   ├── production.config.js
│   └── webpack-dev-server.js
└── webpack-assets.json
```

## Dependencies

- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [ejs-mate](https://github.com/JacksonTian/ejs-mate): Express 4.x locals for layout, partial.
- [morgan](https://github.com/expressjs/morgan): HTTP request logger middleware for node.js
- [winston](https://github.com/winstonjs/winston): A multi-transport async logging library for Node.js

## Dev Dependencies

- [babel](https://github.com/babel/babel/tree/master/packages): Turn ES6 code into readable vanilla ES5 with source maps
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [less](https://github.com/less/less.js): Leaner CSS
- [gulp](https://github.com/gulpjs/gulp): The streaming build system
- [webpack](https://github.com/webpack/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server): Serves a webpack app. Updates the browser on changes.

## Thanks

* wangshijun@renrenche.com
* pengrognshu@renrenche.com
* zhaolin@renrenche.com
* jiarui@renrenche.com


