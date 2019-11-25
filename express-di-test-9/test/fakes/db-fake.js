'use strict'
//fake mirrors the interface of the real db
function getData(type){
  return data.filter(typeMatches(type));
}

function addData({ type, name }){
  data.push(createType(type)(name));
}

function clearData(){
  data.splice(0, data.length);
}

const typeMatches = type => t => t.type === type;

const types = {
  CAT: 'CAT',
  PERSON: 'PERSON',
  DOG: 'DOG'
}

const createType = type => name => ({ type, name });

const data = []

module.exports = { getData, addData, clearData, types }
