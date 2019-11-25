'use strict'
const assert = require('chai').assert;

const fakeDb = require('./fakes/db-fake');
const myAppCreater = require('../src/app-creater');
const myApp = myAppCreater.create({ db: fakeDb });

describe('Checking my app interface', () => {
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