var auth = require('../lib/auth');
var db = require('../database');
var async = require('async');
module.exports = {
    show: function (req, res, next) {
        var users_sql = 'SELECT * from users';
        var data = '';
        db.exec(users_sql, data, function (err, results) {
            if (err) {
            } else 
            {
                var json_result = JSON.stringify(results);
                res.render('user', { title: 'User', rows: results });
            }
        });
    },
    save: function (req, res, user) {
        var hashed_password = auth.saltHashPassword(user.password);
        var users__sql = 'INSERT INTO users SET ?';
        var sip_sql = 'INSERT INTO sip VALUES ?';
        var device_sql = 'INSERT INTO devices SET ?';
        var sip_val = [
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
        var users_val = {
            extension: user.extension,
            password: hashed_password,
            name: user.name
        };
        var device_val = {
            id: user.extension,
            tech: 'sip',
            dial: 'SIP/'+user.extension,
            devicetype: 'fixed',
            Description: user.name
        }
        async.parallel([
                function (callback) {
                    db.exec(users__sql, users_val, function (err, results) {})
                },
                function (callback) {
                    db.exec(sip_sql, [sip_val], function (err, results) {})
                },
                function (callback) {
                    db.exec(device_sql, device_val, function (err, results) {})
                },
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
        var update_id = req.params.id;
        var users_sql = 'UPDATE FROM users WHERE extension= ?';
        db.exec(users_sql, update_id, function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                res.redirect('/user');
            }
        });
    },
    remove: function (req, res, next) {
        var delete_id = req.params.id;
        var users_sql = 'DELETE FROM users WHERE extension= ?';
        var sip_sql = 'DELETE FROM sip WHERE id= ?';
        async.parallel([
                function (callback) {
                    db.exec(users_sql, delete_id, function (err, results) {})
                },
                function (callback) {
                    db.exec(sip_sql, delete_id, function (err, results) {})
                }
            ],
            // optional callback
            function (err, results) {});
        res.redirect('/user');
    },
    user_login: function (req, res) {
        users_exte = req.body.User;
        users_pass = req.body.Password;
        var sql = 'SELECT * FROM users WHERE extension= ? AND password = ?';
        db.exec(sql, [users_exte, users_pass], function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                var exte = results[0].extension;
                res.render('user/profile', { title: 'Profile', rows: results });
            }
        });
    },
    user_display: function (req, res) {
        user_name = req.body.User;
        user_pass = req.body.Password;
        var users_sql = 'SELECT * FROM users WHERE extension= ? AND password = ?';
        db.exec(users_sql, [user_name, user_pass], function (err, results) {
            if (err) {
                // If unexpected error then send 500
            } else {
                res.render('user/', { title: 'User Dashboard' });
            }
        });
    }
}