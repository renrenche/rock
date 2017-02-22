## 前端模块化

> 模块化是编程中的重要概念，同时也是最佳实践。

> 借助Webpack, 使得`“一切皆为模块”`这种想法得以实现，Rock利用并内化了这一特点。

> 本篇将从工程化的角度来聊聊模块化，以及如何应用在一个使用Rock创建的项目当中。

### 模块化

在客户端开发中，一个功能常常需要Html, CSS, Javascript 3种资源相互组织。过去开发时（比如使用jQuery时），这3种文件通常是“割裂”的。

Webpack在构建时，任何静态资源都可以被理解为是一个模块——可以是一个JS对象，一段CSS代码，甚至是一张图片。使得模块化的概念不再局限于Javascript。

Rock将Webpack作为模块管理工具，因此在一个Rock生成的项目中，你可以从功能的角度去组织文件，将一个功能模块的“方方面面”组织在一起，只需要提供一个入口而已。因为Webpack会“顺藤摸瓜”，以入口作为起点，将引用的资源都挖出来，再按照你需要的方式进行分割处理。

接下来我们分类列举一下资源的引用场景和引用方式。

### 资源的相互引用

一个模块包括模板，脚本，样式，图片。其中对于静态资源，有很多相互引用的地方，如图：

![模块图](/docs/image/module.png)

针对图中箭头的数字，分别介绍下引用方式。

#### 1. HTML
**HTML中引用JS文件或CSS文件（图中1，2）**

我们借助webpack-assets-plugin这个webpack插件，生成了编译前后资源映射关系的文件。你需要在渲染之前将这个对象传递给模板，然后再根据需要（也许你根本不需要，也没有样式文件）插入相应的标签。在应用了ejs-mate后的写法如下：

	// 插入JS文件
	<% block('footer').append(`<script src="${assetsConfig.index.js}"></script>`) %>

	// 插入CSS文件
	<% block('head').append(`<link type="text/css" href="${assetsConfig.index.css}" rel="stylesheet" charset="utf-8">`) %>

**HTML引用图片（图中3）**

所有资源最后会被编译到public/projectName/image目录下，因此在模板中使用图片时直接使用编译后的地址。

	<img src="dist/projectName/image/a.jpg />

#### 2. JS
**JS引用图片（图中4）**

	const imgFile =  require('./image/sample.jpg');

**JS中引用CSS（图中5）**

	require('./style.less');

**JS中引用JS模块（图中6）**
引用模块支持2种方式，AMD规范和Commonjs规范。我们推荐使用Commonjs规范！这里只介绍遵循CommonJs的引用方式。

	// module_a.js
	export default class ModuleA {
		...
	}

	// index.js
 	// 支持从node_modules里加载模块，也支持加载自定义模块，所有引入模块都会被打包进index.js
 	import vue from 'vue';
 	import ModuleA from './module_a.js';




#### 3. CSS
**CSS中引用图片（图中7）**

使用相对地址（相对于样式文件）

	.class {
		background: url('./image/sample.jpg');
	}

**CSS引用CSS文件**

使用~引用node_modules中的样式文件
使用相对路径引用自定义样式文件

	@import "~bootstrap/less/bootstrap";
	@import "../client/style.less";

### 最佳实践与注意事项

**公共的内容该怎样组织？**
既然我们认为一切皆为模块，那么一些所有页面均需要应用的初始化或一致化的操作，如模板的一致化如页头页尾，样式的初始化normolize，JS的初始化如初始化数据统计等功能，我们都借助于commone这个模块。

* 我们将最外部的模板部分，写进 `clinet/common/layout.ejs` 下。
* 将初始化样式写进 `client/common/style.less `，并在 `client/common/index.js` 引入。
* 将初始化JS的部分写进 `cleint/common/index.js` ，定义为一个基础类——`class Page` 。
* 最后，在页面级别的JS文件中，继承 `class Page` 就实现了JS的继承以及CSS的引入。在页面级别的EJS文件中，继承 `common/layout.ejs` 就实现了模板的继承。


**如何调用一个子模块？**

模块之间的调用依然符合上面的例子，只是在此强调下个别路径问题。

页面调用子模块分为3部分：模板的调用，样式的调用，js的调用

	// fruit/fruit.ejs
	// 更多模板用法参见：ejs,  ejs-mate 对模板的语法。注意路径是相对于client/的。
	<% include fruit/component/apple/template %>

	// fruit/style.less
 	@import url('./component/apple/style.less');

	// fruit/index.js
	const apple = require('./component/apple');

**如何组织页面与众多子模块？ **

模块的命名参见：01 编码规范，文件命名，及其他约定#01编码规范，文件命名，及其他约定-文件命名
模块目录结构参见：02 目录结构#02目录结构-client/前端目录介绍
