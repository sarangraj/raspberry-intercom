var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess= req.session;
  if(sess.User) {
    res.render('contact', { title: 'Contact' });
}
else {
  res.redirect('/');
}
});

module.exports = router;
