const _ = require('lodash');
const render = require('../libs/render');

module.exports = class BaseController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    dispatch(action = 'index') {
        const Controller = this.constructor;
        return function (req, res, next) {
            const controller = new Controller(req, res, next);
            if (_.isFunction(controller[action] === false)) {
                return next(new Error(`Controller action does not exist {${controller}#${action}}`));
            }
            controller[action](req, res, next);
        };
    }

    render(view, data) {
        this.req._pagePath = view;
        this.req._pageData = data;

        render(this.req, this.res, this.next);
    }
};
