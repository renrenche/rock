const BaseController = require('./base');

module.exports = class IndexController extends BaseController {
    index() {
        this.render('index/index', {
            pagename: 'index',
            message: 'Hello World!',
        });
    }
};
