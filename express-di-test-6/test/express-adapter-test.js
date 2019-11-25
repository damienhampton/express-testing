'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const awilix = require('awilix');
const container = awilix.createContainer();

const fakeDb = require('./fakes/db-fake');
const appCreater = require('../src/app-creater');
const expressAppCreater = require('../src/express-app-creater');

container.register('db', awilix.asValue(fakeDb));
container.register('myApp', awilix.asFunction(appCreater.create));
container.register('logger', awilix.asValue(() => {}));
container.register('expressApp', awilix.asFunction(expressAppCreater.create));

const expressApp = container.resolve('expressApp');

describe('Checking express adapter', () => {
  describe('/', () => {
    it('should tell us to try /cats', (done) => {
      chai.request(expressApp)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql({ try: '/cats' });
          done();
        })
    })
  })
  describe('/cats', () => {
    it('should get list of cats', (done) => {
      chai.request(expressApp)
        .get('/cats')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql(fakeDb.getData(fakeDb.types.CAT));
          done();
        })
    })
  })
  describe('/people', () => {
    it('should get list of people', (done) => {
      chai.request(expressApp)
        .get('/people')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql(fakeDb.getData(fakeDb.types.PERSON));
          done();
        })
    })
  })
  after(() => {
    expressApp.server.close();
  })
})