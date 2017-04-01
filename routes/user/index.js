var express = require('express');
var router = express.Router();
var login_controller = require('../../controllers/login');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('UCP/login', { title: 'User Control Panel'});
});
router.post('/', login_controller.authenticate_user);

module.exports = router;

