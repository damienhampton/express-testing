'use strict'
const awilix = require('awilix');
const container = awilix.createContainer();

const db = require('./lib/db');
const dbFixtures = require('../test/fixtures/db-fixtures');
const appCreater = require('./app-creater');
const expressAppCreater = require('./express-app-creater');
const logger = (...args) => console.log(...args);

container.register('db', awilix.asValue(db));
container.register('dbFixtures', awilix.asFunction(dbFixtures.init));
container.register('myApp', awilix.asFunction(appCreater.create));
container.register('logger', awilix.asValue(logger));
container.register('expressApp', awilix.asFunction(expressAppCreater.create));

async function main(){
  await container.resolve('dbFixtures');
  container.resolve('expressApp');
}

main();