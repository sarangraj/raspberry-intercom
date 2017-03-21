var express = require('express');
var router = express.Router();
var connection = require('../models/user');
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session.User;
  if(sess) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
  res.render('register', { title: 'Register' });    
}
else {
  res.render('login', { title: 'Login Panel' });
}
});
router.post('/', function(req, res, next){
  sess = req.session.User;
  if(sess) {
      req.checkBody({
        'name':{
        notEmpty: true,          
        },
        'secret': {
        notEmpty: true,
        },
      });
     res.end(JSON.stringify(req.body, null, 2));    
}
else {
    res.redirect('/');
}
});
module.exports = router;
