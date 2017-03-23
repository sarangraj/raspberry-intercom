var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/login');
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Panel'});
});
router.post('/', login_controller.authenticate);

module.exports = router;
