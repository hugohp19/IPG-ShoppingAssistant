const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect
  } = require('../../controllers/users'),
  {
    getAllProducts
  } = require('../../controllers/products');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/password', requestPasswordReset);
router.get('/password/:token', passwordRedirect);

router.get('/getproducts', getAllProducts);



module.exports = router;
