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
  app.get('/cats', async (_, res) => res.json(await myApp.getCats()));
  app.get('/people', async (_, res) => res.json(await myApp.getPeople()));

  app.server = app.listen(3000);
  logger('try: http://localhost:3000/cats');

  return app;
}

module.exports = { create };