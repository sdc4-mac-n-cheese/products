const {db} = require('./arango_setup1.js');
const {product, features, styles, related, photos, skus} = require('./arango_setup2.js');

db.useDatabase('productdb')

const listproducts = (page, count) => {
  page = page || 1
  count = count || 5
  db.query({
    query: `FOR p IN @@c LIMIT ${page * count - count}, ${count} RETURN p`,
    bindVars: { "@c": "product" },
  })
    .then(function (cursor) {
      return cursor.forEach(function (product) {
        console.log(product);
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });
}
listproducts(2, 10)

const development = (productid, path) => {
  var retrieved = {}
  //query product
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "product" },
  })
    .then(function (cursor) {
      return cursor.forEach(function (product) {
        console.log(product);
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });
/*
  //query features
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "features" },
  })
    .then(function (cursor) {
      return cursor.forEach(function (features) {
        // console.log(features);
        console.log('exec1')
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });

  //query photos
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "photos" },
  })
    .then(function (cursor) {
      return cursor.forEach(function (photo) {
        // console.log(photo);
        console.log('exec2')
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });

  //query related
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "product" },
  })
    .then(function (cursor) {
      console.log("My product, let me show you them:");
      return cursor.forEach(function (product) {
        console.log(product);
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });

  //query skus
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "product" },
  })
    .then(function (cursor) {
      console.log("My product, let me show you them:");
      return cursor.forEach(function (product) {
        console.log(product);
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });

  //query styles
  db.query({
    query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
    bindVars: { "@c": "product" },
  })
    .then(function (cursor) {
      console.log("My product, let me show you them:");
      return cursor.forEach(function (product) {
        console.log(product);
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });

  return retrieved
  */
}
// development(123456)
//working template
// var productid = 123456
// db.query({
//   query: `FOR p IN @@c FILTER p._key == '${productid}' RETURN p`,
//   bindVars: { "@c": "product" },
// })
//   .then(function (cursor) {
//     console.log("My product, let me show you them:");
//     return cursor.forEach(function (product) {
//       console.log(product);
//     });
//   })
//   .catch(function (err) {
//     console.error(err.message);
//   });

// -- below this line contains experimental code -- //
 //works
  // db.query({
  //   query: "FOR p IN @@c FILTER p.name == 'Summer Shoes' RETURN p",
  //   bindVars: { "@c": "product" },
  // })
  //   .then(function (cursor) {
  //     console.log("My product, let me show you them:");
  //     return cursor.forEach(function (product) {
  //       console.log(product);
  //     });
  //   })
  //   .catch(function (err) {
  //     console.error(err.message);
  //   });

//works
  // product.all().then(
  //   cursor => cursor.map(doc => doc._key)
  // ).then(
  //   keys => console.log('All keys:', keys.join(', ')),
  //   err => console.error('Failed to fetch all documents:', err)
  // );

  // db.query('FOR d IN product LIKE d.name == "Summer Shoes"')
  // .then(
  //   keys => console.log('All keys:', keys.join(', ')),
  //   err => console.error('Failed to execute query:', err)
  // );