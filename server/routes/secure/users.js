const router = require('express').Router(),
  {
    getCurrentUser,
    updateCurrentUser,
    logoutUser,
    logoutAllDevices,
    deleteUser,
    //uploadAvatar,
    updatePassword,
    getAllUsers,
getCurrentUserOrders

  } = require('../../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateCurrentUser);
router.post('/logout', logoutUser);
router.post('/logoutall', logoutAllDevices);
router.delete('/', deleteUser);
router.get('/users', getAllUsers);
router.get('/user/orders', getCurrentUserOrders);

//router.post('/avatar', uploadAvatar);
router.put('/password', updatePassword);

module.exports = router;
