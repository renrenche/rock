/*
 * 说明：
 * 如需引入模块的样式
 * require('./style.less');
 */

define('<%= name %>', [], () => {
    const <%= name %> = {
        init: () => {}
    }
    return <%= name %>;
})

/*
 * 注意：
 * 页面级别的模块，define即会执行，而子组件级别的模块，只有require了才会执行
 */

/*
 * 说明：
 * 如需引用子模块,路径相对于client
 * require(['<%= name %>/component/amd-module'], (AmdModule) => {
 * })
 */

/*
 * 建议：
 * 根据需要，异步加载所需模块
 * require(['jquery'], ($) => {
 *     $('.btn').click(() => {
 *         require(['<%= name %>/component/amd-module'], () => {
 *         });
 *     });
 * })
 */
