'use strict'
const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.json({
    try: '/cats'
  })
})

//wrapped app creation so we can inject dependencies
//injecting db allows us to fake it
//injecting logger allows us to suppress/control output during testing
function create({ db, logger = () => {} }){

  app.get('/cats', (_, res) => {
    res.json(db.getData(db.types.CAT))
  })
  app.get('/people', (_, res) => {
    res.json(db.getData(db.types.PERSON))
  })

  app.server = app.listen(3000);
  logger('try: http://localhost:3000/cats');

  return app;
}

module.exports = { create };