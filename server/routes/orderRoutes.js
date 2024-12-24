const express = require('express');
const router = express.Router();
const {
  createOrder,
  payment,
  addToCart,
  removeFromCart,
  getCart,
  checkout,
  getRentals,
  orderSummary,
  getAllRentals,
  orderSummaryPost,
  deliveryData,
} = require('../controllers/OrderController');

const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/create', createOrder);
router.post('/pay', payment);
router.post('/addToCart', isLoggedIn, addToCart);
router.post('/removeFromCart', isLoggedIn, removeFromCart);
router.get('/viewCart', isLoggedIn, getCart);
router.post('/checkout', isLoggedIn, checkout);
router.get('/getRentals', isLoggedIn, getRentals);
router.get('/orderSummary/:orderID', orderSummary);
router.post('/orderSummary', isLoggedIn, orderSummaryPost);
router.get('/getAllRentals', isLoggedIn, getAllRentals);
router.get('/deliveryData', isLoggedIn, deliveryData);


module.exports = router;
