'use strict'
const assert = require('chai').assert;

const awilix = require('awilix');
const container = awilix.createContainer();

const fakeDb = require('./fakes/db-fake');
const dbFixtures = require('./fixtures/db-fixtures');
const myAppCreater = require('../src/app-creater');

container.register('db', awilix.asValue(fakeDb));
container.register('dbFixtures', awilix.asFunction(dbFixtures));
container.register('myApp', awilix.asFunction(myAppCreater.create));

const myApp = container.resolve('myApp');

describe('Checking my app interface', () => {
  before(() => {
    container.resolve('dbFixtures');
  })
  after(() => {
    fakeDb.clearData();
  })
  describe('getCats', () => {
    it('should get list of cats', () => {
      const result = myApp.getCats();
      assert.deepEqual(result, fakeDb.getData(fakeDb.types.CAT));
    })
  })
  describe('getPeople', () => {
    it('should get list of people', () => {
      const result = myApp.getPeople();
      assert.deepEqual(result, fakeDb.getData(fakeDb.types.PERSON));
     })
  })
})