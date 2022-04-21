const {db} = require('./arango_setup1.js');

//collection handle, create collection
var product = db.collection('product')
product.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)
var features = db.collection('features')
features.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)
var styles = db.collection('styles')
styles.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)
var related = db.collection('related')
related.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)
var photos = db.collection('photos')
photos.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)
var skus = db.collection('skus')
skus.create().then(
  ()=>console.log('Collection created'),
  err=>console.error('Failed to create collection:', err)
)

module.exports = {
  product: product,
  features: features,
  styles: styles,
  related: related,
  photos: photos,
  skus: skus
}