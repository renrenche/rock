/*
 * 说明：
 * 如需引入模块的样式
 * require('./style.less');
 */

/*
 * 说明：
 * 支持相对路径和绝对路径加载模块
 * 绝对路径：查找node_modules下安装的模块
 * 相对路径：基于当前文件查找
 * 以commonjs的方式引用的模块，都会打包进“当前文件”——public/dist/[current].js
 */

const xx = require('xx');

const <%= name %> = {
    init: () => {}
};

module.exports = <%= name %>;
