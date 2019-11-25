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

app.listen(3000);
console.log('try: http://localhost:3000/cats');