const express = require('express');
const assetsConfig = require('../../webpack-assets');
const router = express.Router();

module.exports = function (app) {
    app.use('/<%= router %>', router);
};

router.get('/', function (req, res) {
    res.render('<%= template %>/<%= template %>', {
        // IN NEED
        pagename: '<%= template %>',
        assetsConfig, // static files config in need
        RRC: {},
        // DATA
        data: {
        }
    });
});
