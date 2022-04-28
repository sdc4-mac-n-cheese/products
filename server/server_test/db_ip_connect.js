//require arango, create connection
var DB = require('arangojs').Database;

var db = new DB('http://54.241.187.175:8529');

//

db.useDatabase('productdb')

console.log(db.photos.count().then(console.log('yahaha!')))