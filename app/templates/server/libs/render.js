const fs = require('fs');
const path = require('path');
const config = require('config');

const assetsPath = path.join(config.root, './webpack-assets.json');

module.exports = function render(req, res, next) {
    const { _pagePath, _pageData } = req;

    if (!_pagePath) {
        return next(new Error('req._pagePath is required'), null);
    }

    const pagePath = path.join(__dirname, `../../client/${_pagePath}.ejs`);

    fs.access(pagePath, fs.R_OK, (err) => {
        if (err) {
            return next(new Error(`page file not found ${pagePath}`), null);
        }

        const data = {
            // Common Data
            pagename: _pageData.pagename || _pagePath,
            DATA: _pageData,
            assetsConfig: __DEVELOPMENT__ ? JSON.parse(fs.readFileSync(assetsPath)) : require(assetsPath), //eslint-disable-line
            // pageData
            data: _pageData,
        };
        res.render(_pagePath, data);
    });
};
