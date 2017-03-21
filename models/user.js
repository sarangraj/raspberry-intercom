var auth = require('../lib/auth');
var db = require('../database');
var async = require('async');
module.exports = {
    //   Validate: function(req, res){
    //     req.checkBody('name', 'Username is Required.').notEmpty();
    //     req.checkBody('name', 'Username is Required.').isAlpha();
    //     req.checkBody('extension', 'Family name must be specified.').notEmpty();
    //     req.checkBody('extension', 'Family name must be alphanumeric text.').isInt();
    //     req.checkBody('secret', 'Password is required').optional({
    //         checkFalsy: true
    //     }).notEmpty();
    //     // req.checkBody('branch', 'Branch is required').isInt();
    //     // req.checkBody('Designation', 'Designation is required').isInt();
    //     req.sanitize('name').escape();
    //     req.sanitize('secret').escape();
    //     req.sanitize('name').trim();
    //     req.sanitize('secret').trim();
    //     var errors = req.validationErrors();
    //     var user = {
    //         extension: req.body.extension,
    //         password: auth.saltHashPassword(req.body.password),
    //         name: req.body.name,        
    //         // branch: req.body.branch,
    //         // designation: req.body.Designation
    //     };
    //     return errors;
    //   },
    show: function (req, res, next) {
        var sql = 'SELECT * from users';
        var data = '';
        db.exec(sql, data, function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                var json_result = JSON.stringify(results);
                res.render('user', { title: 'User', rows: results });
            }
        });
    },
    save: function (req, res, user) {
        var hashed_password = auth.saltHashPassword(user.password);  
        var sql = 'INSERT INTO users SET ?';
        var sql1 = 'INSERT INTO sip SET ?';
        var sip = {
            id: user.extension,
            keyword: 'dial',
            data: 'SIP/'+user.extension,
            flags: 2
        }
        var User = {
            extension: user.extension,
            password: hashed_password,
            name: user.name
        }
        console.log(User.password);
        async.parallel([
            function (callback) {
            db.exec(sql, User, function (err, results){
            } ) },
            function (callback) {
            db.exec(sql1, sip, function (err, results) {
            })
            }
        ],
            // optional callback
            function (err, results) {
            });
                res.redirect('/user');            
    },
    edit: function (req, res) {
        var rm_id = req.params.id;
        var sql = 'UPDATE FROM users WHERE extension= ?';
        db.exec(sql, rm_id, function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                res.redirect('/user');
            }
        });
    },
    remove: function (req, res, next) {
        var rm_id = req.params.id;
        var sql = 'DELETE FROM users WHERE extension= ?';
        var sql1 = 'DELETE FROM sip WHERE id= ?';
        
        async.parallel([
            function (callback) {
            db.exec(sql, rm_id, function (err, results){
            } ) },
            function (callback) {
            db.exec(sql1, rm_id, function (err, results) {
            })
            }
        ],
            // optional callback
            function (err, results) {
            });
      
                res.redirect('/user');
    },
    user_login: function (req, res) {
        user_name = req.body.User;
        user_pass = req.body.Password;
        var sql = 'SELECT * FROM users WHERE extension= ? AND password = ?';
        db.exec(sql, [user_name, user_pass], function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                var exte = rows[0].extension;
                res.render('user/profile', { title: 'Profile', rows: results });
            }
        });
    },
    user_display: function (req, res) {
        user_name = req.body.User;
        user_pass = req.body.Password;
        var sql = 'SELECT * FROM users WHERE extension= ? AND password = ?';
        db.exec(sql, [user_name, user_pass], function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                res.render('user/', { title: 'Profile' });
            }
        });
    }
}