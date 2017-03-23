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
                res.render('user', {
                    title: 'User',
                    rows: results
                });
            }
        });
    },
    save: function (req, res, user) {
        var hashed_password = auth.saltHashPassword(user.password);
        var sql = 'INSERT INTO users SET ?';
        var sql1 = 'INSERT INTO sip VALUES ?';
        var sip = [
    [
        user.extension,
        'dial',
        'SIP/'+user.extension,
        23
    ],
    [
        user.extension,
        'secret',
        user.extension+'pass',
        2
    ],
    [
        user.extension,
        'dtmfmode',
        'rfc2833',
        3
    ],
    [
        user.extension,
        'canreinvite',
        'no',
        4
    ],
    [
        user.extension,
        'context',
        'from-internal',
        5
    ],
    [
        user.extension,
        'host',
        'dynamic',
        6
    ],
    [
        user.extension,
        'trustrpid',
        'yes',
        7
    ],
    [
        user.extension,
        'sendrpid',
        'no',
        8
    ],
    [
        user.extension,
        'type',
        'friend',
        9
    ],
    [
        user.extension,
        'nat',
        'no',
        10
    ],
    [
        user.extension,
        'port',
        '5060',
        11
    ],
    [
        user.extension,
        'qualify',
        'yes',
        12
    ],
    [
        user.extension,
        'qualifyfreq',
        60,
        13
    ],
    [
        user.extension,
        'transport',
        'udp,tcp,tls',
        14
    ],
    [
        user.extension,
        'avpf',
        'no',
        15
    ],
    [
        user.extension,
        'force_avp',
        'no',
        16
    ],
    [
        user.extension,
        'icesupport',
        'no',
        17
    ],
    [
        user.extension,
        'encryption',
        'no',
        18
    ],
    [
        user.extension,
        'namedcallgroup',
        '',
        19
    ],
    [
        user.extension,
        'namedpickupgroup',
        '',
        20
    ],
    [
        user.extension,
        'disallow',
        '',
        21
    ],
    [
        user.extension,
        'allow',
        '',
        22
    ],
    [
        user.extension,
        'accountcode',
        '',
        24
    ],
    [
        user.extension,
        'deny',
        '0.0.0.0/0.0.0.0',
        25
    ],
    [
        user.extension,
        'permit',
        '0.0.0.0/0.0.0.0',
        26
    ],
    [
        user.extension,
        'secret_origional',
        '',
        27
    ],
    [
        user.extension,
        'sipdriver',
        'chan_sip',
        28
    ],
    [
        user.extension,
        'account',
        user.extension,
        29
    ],
    [
        user.extension,
        'callerid',
        'device<'+user.extension+'>',
        '30'
        ]
        ];
        var User = {
            extension: user.extension,
            password: hashed_password,
            name: user.name
        };
        var check='SELECT extension from users WHERE extension =?';
        var check_data = user.extension;
        async.series([
                function (callback) {
                    db.exec(check, check_data, function (err, results) {
                        if( err ){
                            res.render('register',{title:'Add User', error: 'User already exist' });
                        }
                    })
                },
                function (callback) {
                    db.exec(sql, User, function (err, results) {})
                },
                function (callback) {
                    db.exec(sql1, [sip], function (err, results) {})
                }
            ],
            // optional callback
            function (err, results) {
                if( err ){
                    res.render('register',{title:'Add User', error: 'User already exist' });
                }
                else
                res.redirect('/user');        
            });
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
                    db.exec(sql, rm_id, function (err, results) {})
                },
                function (callback) {
                    db.exec(sql1, rm_id, function (err, results) {})
                }
            ],
            // optional callback
            function (err, results) {});
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
                var exte = results[0].extension;
                res.render('user/profile', {
                    title: 'Profile',
                    rows: results
                });
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
                res.render('user/', {
                    title: 'User Dashboard'
                });
            }
        });
    }
}