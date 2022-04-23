//require arango, create connection
var arangojs = require('arangojs');
var db = new arangojs.Database();

//create database if not exists
db.listDatabases().then((names) => {
  if (names.indexOf('productdb') > -1){
    db.useDatabase('productdb');
  } else {
    db.createDatabase('productdb').then(
     ()=> console.log("Database created successfully: productdb"),
      error=> console.error("Error creating database: " + error)
    )}
  }).then (() => {
    db.get().then(
      ()=> console.log("Using database productdb"),
      error=> console.error("Error connecting to database: " + error)
    );
  });

//use database
db.useDatabase('productdb')

module.exports = {
  db: db
}

//old create database code
// db.createDatabase('productdb')
  // .then(()=>console.log('Database created'),
  //   err => console.error('Failed to create database:', err)
  // );