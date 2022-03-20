const router = require('express').Router(),
  {
    createOrder,
    getOrders,
    getOrdersByDates
  } = require('../../controllers/orders');

router.post('/addorder', createOrder);
router.get('/orders', getOrders);
router.post('/ordersbydates', getOrdersByDates);

module.exports = router;