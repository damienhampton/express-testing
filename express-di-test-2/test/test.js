'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

//wire it up!

const fakeDb = require('./fakes/db-fake');
const appCreater = require('../src/app-creater');

const app = appCreater.create({ db: fakeDb });

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
          res.body.should.eql(fakeDb.getData(fakeDb.types.CAT));
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
          res.body.should.eql(fakeDb.getData(fakeDb.types.PERSON));
          done();
        })
    })
  })
  after(() => {
    app.server.close();
  })
})