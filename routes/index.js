var express = require('express');
var router = express.Router();
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess= req.session;
  if(sess.User) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
  res.render('index', { title: 'Dashboard' });    
}
else {
  res.render('login', { title: 'Login Panel' });
}
});

module.exports = router;
