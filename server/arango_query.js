const {db} = require('./arango_setup1.js');
// const {product, features, styles, related, photos, skus} = require('./arango_setup2.js');

db.useDatabase('productdb')

const listproducts = (page, count) => {
  page = page || 1
  count = count || 5
  console.log('Executing query...')
  return db.query({
      query: `FOR p IN @@c LIMIT ${page * count - count}, ${count} RETURN {id: p.id, name: p.name, slogan: p.slogan, description: p.description, category: p.category, default_price: p.default_price}`,
      bindVars: { "@c": "product" },
    })
    .then(function (cursor) {
      return cursor.map((product)=>{
        return product
      })
    })
    .catch(function (err) {
      console.error(err.message);
    });
}
// listproducts(1, 5).then(console.log) //step1

const productinformation = (productid) => {
  productid = productid || 1
  console.log('Executing query...')
  return db.query({
    query: `FOR p IN @@p
    FILTER p.id == ${productid}
    LET array = (
    FOR f IN @@f
    FILTER f.product_id == ${productid}
    RETURN {feature: f.feature, value: f.value})
    RETURN {id: p.id, name: p.name, slogan: p.slogan, description: p.description, category: p.category, default_price: p.default_price, features: array}`,
    bindVars: { "@p": "product", "@f": "features" },
  })
    .then(function (cursor) {
      return cursor.map(function (product) {
        return product;
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });
}
// productinformation(123456).then(console.log) //step2

const productstyles = (productid) => {
  return db.query({
    query: `for st in @@st
    filter st.productId == ${productid}

    let first = (
    for p in @@p
    filter p.styleId == st.id
    return {thumbnail_url: p.thumbnail_url, url: p.url})

    let second = (
    return merge(
    for sk in @@sk
    filter sk.styleId == st.id
    return {[sk.id]: {quantity: sk.quantity, size: sk.size}}))

    return {style_id: st.id, name: st.name, original_price: st.original_price, sale_price: st.sale_price || 0, default: 0 < st.default_style, photos: first, skus: second}`,
    bindVars: { "@p": "photos", "@st": "styles", "@sk":"skus" },
  })
    .then(function (cursor) {
      return cursor.map(function (product) {
        return product;
      });
    })
    .catch(function (err) {
      console.error(err.message);
    });
}
// productstyles(123456).then(console.log) //step3

const relatedproducts = (productid) => {
  console.log('Executing query...')
  return db.query({
      query: `FOR r IN @@r FILTER r.current_product_id == ${productid} RETURN r.related_product_id`,
      bindVars: { "@r": "related" },
    })
    .then(function (cursor) {
      return cursor.map((product)=>{
        return product
      })
    })
    .catch(function (err) {
      console.error(err.message);
    });
}
// relatedproducts(123456).then(console.log)//step4

module.exports = {
  listproducts: listproducts,
  productinformation: productinformation,
  productstyles: productstyles,
  relatedproducts: relatedproducts
}

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