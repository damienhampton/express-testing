'use strict'
const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.json({
    try: '/cats'
  })
})

function create({ myApp, logger }){
  //routes map to app functions
  app.get('/cats', (_, res) => res.json(myApp.getCats()));
  app.get('/people', (_, res) => res.json(myApp.getPeople()));

  app.server = app.listen(3000);
  logger('try: http://localhost:3000/cats');

  return app;
}

module.exports = { create };