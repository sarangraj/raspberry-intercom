var express = require('express');
var router = express.Router();
var other_controller = require('../controllers/otherControl');
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
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  sess= req.session;
  if(sess.User) {
    res.render('contact', { title: 'Contact' });
}
else {
  res.redirect('/');
}
});
/* GET home page. */
router.get('/about', other_controller.about_us);

module.exports = router;
