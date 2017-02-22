const express = require('express');

// TODO: do not need to require like keystone
const IndexController = require('../controllers/index');

module.exports = (app) => {
    const router = express.Router(); // eslint-disable-line new-cap
    router.get('/', IndexController.prototype.dispatch('index'));

    app.use('/', router);
};
