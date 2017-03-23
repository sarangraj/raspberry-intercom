var auth = require('../lib/auth');
var db = require('../database');
var async = require('async');
var sess;
module.exports = 
    {
        authorise: function (req, res, next) 
        {
            var hashed_password = auth.saltHashPassword(req.body.Password);
            var sql = 'SELECT * FROM ampusers WHERE username=? LIMIT 1';
            var data = req.body.User;
            var hashed_password = auth.saltHashPassword(req.body.Password);
            db.exec(sql, data, function (err, results) 
            {
                if (err) 
                {
                        res.render('login', { title: 'login', error: 'Invalid Username or Password' });
                } 
                else 
                {
                    if (results.length == 1) {
                        if (results[0].password_sha1 == hashed_password) 
                        {
                            sess = req.session;
                            sess.User = req.body.User;
                            res.redirect('/');
                        }
                        else 
                        {
                        res.render('login', { title: 'login', error: 'Invalid Username or Password' });
                        }
                    }
                    else 
                    {
                        res.render('login', { title: 'login', error: 'Invalid Username or Password' });
                    }
                }
        });
    }
}