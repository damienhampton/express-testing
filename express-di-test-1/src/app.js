'use strict'
const express = require('express')
const app = express();
const db = require('./lib/db');

app.get('/', (req, res) => {
  res.json({
    try: '/cats'
  })
})

app.get('/cats', (_, res) => {
  res.json(db.getData(db.types.CAT))
})
app.get('/people', (_, res) => {
  res.json(db.getData(db.types.PERSON))
})

//create server prop so we can stop server
app.server = app.listen(3000);
console.log('try: http://localhost:3000/cats');

//export app for testing
module.exports = app;

//we could just write external HTTP tests, but that will be verbose and slow and I want to show how to simplify testing