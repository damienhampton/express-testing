'use strict'
function getData(type){
  return data.filter(typeMatches(type));
}

const typeMatches = type => t => t.type === type;

const types = {
  CAT: 'CAT',
  PERSON: 'PERSON'
}

const createType = type => name => ({ type, name });
const createCat = createType(types.CAT);
const createPerson = createType(types.PERSON);

const data = [
  createCat('lola'),
  createCat('enzo'),
  createPerson('tonio'),
  createPerson('wendy'),
]

module.exports = { getData, types }
