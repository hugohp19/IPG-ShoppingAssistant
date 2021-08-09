const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect,
    sendFormulario
  } = require('../../controllers/users'),
  {
    getAllProducts
  } = require('../../controllers/products');

router.post('/', createUser);
router.post('/sendFormulario', sendFormulario);
router.post('/login', loginUser);
router.get('/password', requestPasswordReset);
router.get('/password/:token', passwordRedirect);

router.get('/getproducts', getAllProducts);



module.exports = router;
