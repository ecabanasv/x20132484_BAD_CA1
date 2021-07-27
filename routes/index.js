var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/register', function(req, res, next) {
  res.render('registerBike', {page:'Register Bike', menuId:'register'});
});

router.get('/faq', function(req, res, next) {
  res.render('faq', {page:'FAQ', menuId:'faq'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact', menuId:'contact'});
});

module.exports = router;