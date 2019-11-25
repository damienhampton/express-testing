'use strict'
//wire it up!

const db = require('./lib/db');
const appCreater = require('./app-creater');
const logger = (...args) => console.log(...args);

appCreater.create({ db, logger });