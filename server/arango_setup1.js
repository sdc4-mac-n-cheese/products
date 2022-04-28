//require arango, create connection
var arangojs = require('arangojs');
var db = new arangojs.Database('http://3.101.116.120:8529')
// var db = new arangojs.Database('http://127.0.0.1:8529')

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
      ()=> console.log('Using database "productdb"'),
      error=> console.error("Error connecting to database: " + error)
    );
  });

//use database
db.useDatabase('productdb')
// db.useDatabase('productdb').then(console.log('Connecting to AWS Instance...'))

module.exports = {
  db: db
}

//old create database code
// db.createDatabase('productdb')
  // .then(()=>console.log('Database created'),
  //   err => console.error('Failed to create database:', err)
  // );