'use strict'
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
  PERSON: 'PERSON'
}

const data = [];

const createType = type => name => ({ type, name });

module.exports = { getData, addData, clearData, types }
