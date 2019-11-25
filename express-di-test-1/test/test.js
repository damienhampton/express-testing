'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const sinon = require('sinon');

//START: Lets build our stub
const types = {
  CAT: 'CAT',
  PERSON: 'PERSON'
}

const createType = type => name => ({ type, name });
const createCat = createType(types.CAT);
const createPerson = createType(types.PERSON);

const data = [
  createCat('fake-lola'),
  createCat('fake-enzo'),
  createPerson('fake-tonio'),
  createPerson('fake-wendy'),
]

const db = require('../src/lib/db');

const getData = sinon.stub(db, 'getData');
getData
  .withArgs(db.types.CAT)
  .returns(data.filter(d => d.type == db.types.CAT))

getData
  .withArgs(db.types.PERSON)
  .returns(data.filter(d => d.type == db.types.PERSON))

//END: Lets build our stub

const app = require('../src/app');

describe('Checking app endpoints', () => {
  describe('/', () => {
    it('should tell us to try /cats', (done) => {
      chai.request(app)
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
      chai.request(app)
        .get('/cats')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql(data.filter(d => d.type == db.types.CAT));
          done();
        })
    })
  })
  describe('/people', () => {
    it('should get list of people', (done) => {
      chai.request(app)
        .get('/people')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.eql(data.filter(d => d.type == db.types.PERSON));
          done();
        })
    })
  })
  after(() => {
    app.server.close();
  })
})