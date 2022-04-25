const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.json());
const {listproducts, productinformation, productstyles, relatedproducts} = require('./arango_query.js');

app.get('/products', (req, res) => {
  console.log('Serving get/products request')
  listproducts(req.body.page, req.body.count)
    .then((result)=>{res.send(result)})
})

app.get('/products/:product_id', (req, res) => {
  console.log('Serving get/products request')
  productinformation(req.params.product_id)
    .then((result)=>{
      res.send(result[0])})
})

app.get('/products/:product_id/styles', (req, res) => {
  console.log('Serving get/products:product_id/styles request')
  console.log('params vs query: ', req.params, req.query)
  productstyles(req.params.product_id)
    .then((result)=>{
      // console.log('result: ', result)
      result.forEach((obj)=>{
        obj.skus = obj.skus[0]
      })
      var returnobj = {
        product_id: req.params.product_id,
        results: result
      }
      // console.log('returnobj: ', returnobj)
      res.send(returnobj)})
})

app.get('/products/:product_id/related', (req, res) => {
  console.log('Serving get/products:product_id/styles request')
  console.log('params vs query: ', req.params, req.query)
  relatedproducts(req.params.product_id)
    .then((result)=>{res.send(result)})
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})