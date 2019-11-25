'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const awilix = require('awilix');
const container = awilix.createContainer();

const expressAppCreater = require('../src/express-app-creater');

const cats = [
  { type: 'CAT', name: 'daisy' },
  { type: 'CAT', name: 'esteban' }
]
const people = [
  { type: 'PERSON', name: 'jules' },
  { type: 'PERSON', name: 'damien' }
]
const getCats = () => cats;
const getPeople = () => people;

const myApp = {
  getCats,
  getPeople
}

container.register('myApp', awilix.asValue(myApp));
container.register('logger', awilix.asValue(() => {}));
container.register('expressApp', awilix.asFunction(expressAppCreater.create));

const expressApp = container.resolve('expressApp');

describe('Checking express adapter', () => {
  after(() => {
    expressApp.server.close();
  })
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
          res.body.should.eql(cats);
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
          res.body.should.eql(people);
          done();
        })
    })
  })
})