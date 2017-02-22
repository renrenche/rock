## 01 编码规范，文件命名，及其他约定

> 约定 > 配置。本篇介绍Rock项目的一些约定。

1. <a href="#编码规范">编码规范</a>
2. <a href="#文件命名">文件命名</a>
3. <a href="#模块化">模块化</a>
4. <a href="#参考">参考</a>

### <a name="编码规范">编码规范</a>
前端编码规范继承 [`eslint-config-renrenche`](https://github.com/renrenche/eslint-config-renrenche)（部分继承自eslint-config-airbnb）。

### <a name="文件命名">文件命名</a>
文件和文件夹的命名均遵循：`文件/夹名为英文单词全拼，单数，多个单词用英文连字符"-"连接`。

### <a name="模块化">模块化</a>
前端文件（client目录下）皆`模块化`，详细说明可参见：02 目录结构

每个模块包含以下几种文件：

* 模板文件：[folder].ejs，与文件夹同名
* Js入口文件：index.js
* 样式文件：style.less 或 style.css。如果有多个样式文件，子样式文件放在css/目录下，在style.less中统一引入
* 静态资源：image/*。
* 子模块： component/*
* 测试文件： index.spec.js

举例：

	fruit/
	├── fruit.ejs
	├── index.js
	├── style.less
	├── components
	│   └── apple
	│       ├── apple.ejs
	│       ├── index.js
	│       └── style.less
	├── css
	│   └── color.less
	└── image
    	└── sample.png

### <a name="参考">参考</a>
javascript code style: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
