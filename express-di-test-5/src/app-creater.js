'use strict'

function create({ db }){
  const getCats = () => db.getData(db.types.CAT);
  const getPeople = () => db.getData(db.types.PERSON);

  return {
    getCats,
    getPeople
  }
}

module.exports = { create };