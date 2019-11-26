# Simplifying testing for Express apps

* Starts with basic express app, dependencies through application
* Work through changes to get app under test
* Further changes to introduce hexagonal architecture to aid testing and create separation

## The folders

* 0 - the original basic express app
* 1 - a few minor changes to the to allow me to control it, tests using chai-http and sinon to wrestle the thing under control
* 2 - dependency inversion for database to allow me to inject a fake DB for testing, remove the need for Sinon and to suppress console.logs
* 3 - extract app logic to own file to allow me to test without going through express
* 4 - dependency inversion of app / express - express now only needs to know my app's public interface
* 5 - using DI container (https://www.npmjs.com/package/awilix) to wire app and tests together
* 6 - reintroducing tests of DB adapter and express layer, just to show that they still work
* 7 - introduced fixtures, allowing me to remove hardcoded data from DB code
* 8 - isolated DB adapter in DB tests, isolated express adapter in express tests
* 9 - just to show that it works: replaced real in-memory DB with local Mongo DB

A couple of notes:
* Mongo and the connection string dependencies should be injected
* In connecting Mongo, I had to make a number of interfaces async, which meant modifying code elsewhere (I think it might be best to assume that all interfaces are async)