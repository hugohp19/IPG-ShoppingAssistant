const router = require('express').Router(),
  {
    createOrder,
    getOrders
  } = require('../../controllers/orders');

router.post('/addorder', createOrder);
router.get('/orders', getOrders);

module.exports = router;