'use strict'
const assert = require('chai').assert;

const awilix = require('awilix');
const container = awilix.createContainer();

const db = require('../src/lib/db');
const myAppCreater = require('../src/app-creater');

container.register('db', awilix.asValue(db));
container.register('myApp', awilix.asFunction(myAppCreater.create));

const myApp = container.resolve('myApp');

describe('Checking my db adapter', () => {
  describe('getCats', () => {
    it('should get list of cats', () => {
      const result = myApp.getCats();
      assert.deepEqual(result, db.getData(db.types.CAT));
    })
  })
  describe('getPeople', () => {
    it('should get list of people', () => {
      const result = myApp.getPeople();
      assert.deepEqual(result, db.getData(db.types.PERSON));
     })
  })
})