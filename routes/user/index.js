var express = require('express');
var router = express.Router();
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.Admin) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
  res.render('user/index', { title: 'Dashboard' });    
}
else {
  res.render('user/login', { title: 'UCP' });
}
});

module.exports = router;
