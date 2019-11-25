'use strict'

const data = [
  { type: 'CAT', name: 'tiddles' },
  { type: 'CAT', name: 'buffy' },
  { type: 'PERSON', name: 'john' },
  { type: 'PERSON', name: 'jane' }
]

function init({ db }){
  data.map(record => db.addData(record));
}

module.exports = init;