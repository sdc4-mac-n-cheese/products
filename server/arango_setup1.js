//require arango, create connection
var arangojs = require('arangojs');
var db = new arangojs.Database();

//create database
db.createDatabase('productdb')
  .then(()=>console.log('Database created'),
    err => console.error('Failed to create database:', err)
  );

//use database
db.useDatabase('productdb')

module.exports = {
  db: db
}