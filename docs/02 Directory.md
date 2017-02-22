## 02 目录结构

> 本篇将介绍Rock生成的项目的目录结构与功能。

1. <a href="#client/ 前端目录">client/ 前端目录</a>
2. <a href="#server/ 后端目录">server/ 后端目录</a>
3. <a href="#config/ 配置webpack/ 构建">config/ 配置</a>
4. <a href="#scripts/ 脚本">scripts/ 脚本</a>
5. <a href="#webpack/ 构建">webpack/ 构建</a>
6. <a href="#public/ 编译后的静态资源">public/ 编译后的静态资源</a>
4. <a href="#整体项目目录一览">整体项目目录一览</a>

### <a name="client/ 前端目录">client/ 前端目录</a>
该目录下存放前端（浏览器端）文件。

注意，在文件的命名时，请遵循：01_编码规范，文件命名，及其他约定.md

**前端的目录结构有如下`特点`:**

* 一切皆可看做模块。
* 一个模块可包括：模板，脚本，样式，静态资源，子模块。
* 模块可分为2类：页面级别模块和非页面级别模块（我们称之为子模块）。

页面级别的模块与子模块之间`唯一区别`是，页面级别的模块会被当做webpack的入口文件，从而被编译。从另一个角度来讲，如果一个子模块没有被任何一个页面级别的模块引用过，那么它最终不会被编译。

**因此为了配置webpack，我们做如下`约定`:**

* client下的第一级子目录均为页面级别模块。
* 页面级别模必须包含`index.js`文件作为入口文件。
* 页面级别模块可包含子模块。

接下来以一个car 文件夹为例，进行介绍：

    fruit/
    ├── component        // 子模块，可复用
    │   └── apple
    │       └── index.js
    ├── css
    │   └── color.less
    ├── image
    │   └── sample.png
    ├── fruit.ejs        // 模板
    ├── index.js         // JS
    ├── index.spec.js    // 测试
    └── style.less       // 样式

### <a name="server/ 后端目录">server/ 后端目录</a>
该目录下存放服务器端文件。

    server/
    ├── controllers    // 控制器
    │   ├── base.js    // 控制器基类，封装了基础方法如 dispatch, render
    │   └── index.js
    ├── libs
    │   └── render.js
    ├── routes        // 路由
    │   └── index.js
    └── server.js     // Node.js入口文件

### <a name="config/ 配置">config/ 配置</a>
该目录下存放配置文件，使用[config模块](https://github.com/typesafehub/config)进行管理.

    config
    ├── default.js
    ├── development.js
    └── production.js

### <a name="scripts/ 脚本">scripts/ 脚本</a>
该目录下存放自动化脚本文件，使用 [scripty](https://github.com/testdouble/scripty) 和 [npm scripts](https://docs.npmjs.com/misc/scripts) 进行管理。

涉及自动构建，部署，自动化测试。使用时需结合具体项目情况，此处仅供参考。

    scripts/
    ├── build
    │   ├── jenkins.sh
    │   ├── release.sh
    │   └── webpack.sh
    ├── crontab.sh
    ├── deploy
    │   ├── production.sh
    │   └── test.sh
    ├── deploy.sh
    ├── process.production.json
    └── test
        ├── coverage.sh
        └── unit.sh

### <a name="webpack/ 构建">webpack/ 构建</a>
该目录下存放webpack的配置文件，区分运行环境，可自行追加其他环境的配置。

`webpack/webpack-dev-server.js` 是开发环境下为静态文件提供服务的工具。线上服务不适用该功能，建议将静态资源上传至CDN。如果暂时没有CDN服务，可先运行 `npm run build:webpack` 命令，再修改 `server.js` 中Server静态文件相关代码。

    webpack
    ├── webpack-dev-server.js
    ├── webpack.build.js
    ├── webpack.dev.js
    └── webpack.make.js

### <a name="public/ 编译后的静态资源">public/ 编译后的静态资源</a>

该目录下存放静态资源文件。如 .css, .js, .png 。

### <a name="整体项目目录一览">整体项目目录一览</a>

    ├── client
    │   ├── common
    │   │   ├── index.js
    │   │   ├── index.spec.js
    │   │   ├── layout.ejs
    │   │   ├── libs
    │   │   │   ├── jquery.js
    │   │   │   └── log.js
    │   │   └── style.less
    │   └── index
    │       ├── image
    │       │   └── logo.png
    │       ├── index.ejs
    │       ├── index.js
    │       ├── index.spec.js
    │       └── style.less
    ├── config
    │   ├── default.js
    │   ├── development.js
    │   └── production.js
    ├── gulpfile.js
    ├── index.js
    ├── package.json
    ├── scripts
    │   ├── build
    │   │   ├── jenkins.sh
    │   │   └── release.sh
    │   ├── crontab.sh
    │   ├── deploy
    │   │   ├── production.sh
    │   │   └── test.sh
    │   ├── deploy.sh
    │   ├── process.production.json
    │   └── test
    │       ├── coverage.sh
    │       └── unit.sh
    ├── server
    │   ├── controllers
    │   │   └── index.js
    │   ├── server.js
    │   └── views
    ├── webpack
    │   ├── webpack.dev.js
    │   ├── webpack.build.js
    │   ├── webpack.make.js
    │   └── webpack-dev-server.js
    └── webpack-assets.json



