'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/expressTest', { useNewUrlParser: true, useUnifiedTopology: true });

const Thing = mongoose.model('Thing', { name: String, type: String });

async function getData(type){
  const things = await Thing.find({ type }).exec();
  return things.map(({ type, name }) => ({type, name}));
}

function addData({ type, name }){
  return (new Thing(createType(type)(name))).save();
}

function clearData(){
  return Thing.deleteMany({}).exec();
}

function close(){
  mongoose.connection.close();
}

const types = {
  CAT: 'CAT',
  PERSON: 'PERSON'
}

const createType = type => name => ({ type, name });

module.exports = { getData, addData, clearData, types, close }
