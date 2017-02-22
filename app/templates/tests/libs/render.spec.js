const expect = require('chai').expect;
const render = require('../../server/libs/render.js');

describe('server.libs.render', function () {
    describe('#render', function () {
        it('render should be a function', function () {
            expect(render).to.be.a.function; // eslint-disable-line
        });
    });
});
