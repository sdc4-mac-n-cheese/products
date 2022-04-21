const {db} = require('./arango_setup1.js');
const {product, features, styles, related, photos, skus} = require('./arango_setup2.js');

//database: productdb
//document: set key and body
const addDocument = (body, id) => {
  //create document
  var doc = {
    _key: `${id}`,
    body: body
  }
  collection.save(doc)
    .then(
      meta=>console.log('Document saved:', meta._rev),
      err=>console.log('Failed to save document:', err)
    );
  }
  addDocument({hello: true}, 1);
  //query documents
  // collection.update('firstDocument', {d: 'qux'})
  //   .then(
  //     meta => console.log('Document updated:', meta._rev),
  //     err => console.error('Failed to update document:', err)
  //   );