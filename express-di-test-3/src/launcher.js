'use strict'
//wire it up!

const db = require('./lib/db');
const expressAppCreater = require('./express-app-creater');
const logger = (...args) => console.log(...args);

expressAppCreater.create({ db, logger });