const router = require('express').Router(),
  {
    createProduct,
    updateProduct
  } = require('../../controllers/products');

router.post('/addproduct', createProduct);
router.put('/updateproduct', updateProduct);

module.exports = router;