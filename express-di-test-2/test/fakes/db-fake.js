'use strict'
//fake mirrors the interface of the real db
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
  createCat('fake-lola'),
  createCat('fake-enzo'),
  createPerson('fake-tonio'),
  createPerson('fake-wendy'),
]

module.exports = { getData, types }
