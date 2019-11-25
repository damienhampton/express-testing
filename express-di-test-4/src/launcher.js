'use strict'
//wire it up!

const db = require('./lib/db');
const appCreater = require('./app-creater');
const expressAppCreater = require('./express-app-creater');
const logger = (...args) => console.log(...args);

//All wiring is now done here
const myApp = appCreater.create({ db });
expressAppCreater.create({ myApp, logger });