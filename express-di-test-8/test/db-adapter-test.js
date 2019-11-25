'use strict'
const assert = require('chai').assert;

const awilix = require('awilix');
const container = awilix.createContainer();

const db = require('../src/lib/db');
const dbFixtures = require('./fixtures/db-fixtures');

container.register('db', awilix.asValue(db));
container.register('dbFixtures', awilix.asFunction(dbFixtures.init));

describe('Checking my db adapter', () => {
  before(() => {
    container.resolve('dbFixtures');
  })
  after(() => {
    db.clearData();
  })
  describe('getData', () => {
    it('should get list of cats', () => {
      const result = db.getData(db.types.CAT);
      assert.deepEqual(result, dbFixtures.data.filter(d => d.type == db.types.CAT));
    })
  })
})