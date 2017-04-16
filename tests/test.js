
/** *********************************************************
 *  Test using the sample folder
 ** *********************************************************/

const mocha = require('mocha');
const assert = require('assert');
const path = require('path');
const coMocha = require('co-mocha');
// const should = require('should');
const loader = require('../index');

coMocha(mocha);

describe('Load the sample folder', function () {
  it('Should load the sample folder', function* () {
    const obj = yield loader(path.resolve(__dirname, './sample'));
    assert.equal(obj.method(), 'root', 'Root method');
    assert.equal(obj.one.method(), 'one', 'Level one method');
    assert.equal(obj.one.two.method(), 'two', 'Level two method');
  });
});

