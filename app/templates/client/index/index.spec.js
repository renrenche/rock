const index = require('./index.js');
const expect = require('chai').expect;

describe('client.index', function () {
    it('init should be a function', function () {
        expect(index.init).to.be.a.function; // eslint-disable-line
    });
});
