var express = require('express');
var router = express.Router();
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Panel'});
});
router.post('/', function(req, res, next){
    if(!req.body.User || !req.body.Password){
        res.render('login', { title: 'Login Panel' ,error: 'Invalid Username or Password'});              
    }
    else{
        if(req.body.User == 'raspberry' && req.body.Password == 'admin'){
            sess = req.session;
            sess.User = req.body.User;
            res.redirect('/');                  
    }
    else
    {
        res.render('login', { title: 'Login Panel' ,error: ' Invalid Username or Password'});              
    }
    }
    });
module.exports = router;
