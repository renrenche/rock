## Let's Rock

> 本篇补充一些细节，使你使用rock更加便利。

1. <a href="#Server-side no-Babel">Server-side no-Babel</a>
2. <a href="#开发者工具">开发者工具</a>

### <a name="Server-side no-Babel">Server-side no-Babel</a>

鉴于[Node v7对ES2015的支持已达到97%](https://kangax.github.io/compat-table/es6/)，同时在服务端使用babel既不利于性能又不利于调试，因此Rock没有在服务端启用Babel。

但你依然可以使用大部分ES2015的语法，只是有几个常用的功能，比如[对象的扩展运算符...](http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符)（它属于ES2017）和[ ES Modules（import, export）](https://nodesource.com/blog/es-modules-and-node-js-hard-choices/)暂时没办法使用。不过可以用其他方式替代，不是吗？

### <a name="开发者工具">开发者工具</a>

在使用sourcemap和livereload之前需要注意的是：
#### sourcemap
如何开启sourcemap：

1. 打开谷歌开发者工具
2. 点击 ![谷歌浏览器设置](/docs/image/chrome-setting.png) 选择settings
![谷歌浏览器设置面板](/docs/image/chrome-setting-panel.png)
3. 选中sources中 Enable JavaScript source maps选项
![设置source-map](/docs/image/source-map-setting.png)

#### livereload
浏览器中下载livereload插件：

1. 选择谷歌浏览器的设置
2. 点击扩展程序，获取更多扩展程序
3. 搜索LiveReload
![livereload](/docs/image/live-reload.png)
点击   添加至CHROME
4. 在扩展程序中启用LiveReload

