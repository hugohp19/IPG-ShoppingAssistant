const router = require('express').Router(),
  {
    createProduct
  } = require('../../controllers/products');

router.post('/addproduct', createProduct);

module.exports = router;