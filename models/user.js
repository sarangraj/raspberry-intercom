var auth = require('../lib/auth');
var db = require('../database');
var async = require('async');
module.exports = {
    show: function (req, res, next) {
        var users_sql = 'SELECT * from users';
        var data = '';
        db.exec(users_sql, data, function (err, results) {
            if (err) {} else {
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
        var users__sql = 'INSERT INTO users SET ?';
        var sip_sql = 'INSERT INTO sip VALUES ?';
        var device_sql = 'INSERT INTO devices SET ?';
        var sip_val = [
            [user.extension, 'dial', 'SIP/' + user.extension, 26],
            [user.extension, 'secret', user.extension + 'pass', 2],
            [user.extension, 'dtmfmode', 'rfc2833', 3],
            [user.extension, 'canreinvite', 'no', 4],
            [user.extension, 'context', 'from-internal', 5],
            [user.extension, 'host', 'dynamic', 6],
            [user.extension, 'defaultuser', '', 7],
            [user.extension, 'trustrpid', 'yes', 8],
            [user.extension, 'sendrpid', 'no', 9],
            [user.extension, 'type', 'friend', 10],
            [user.extension, 'sessiontimers', 'accept', 11],
            [user.extension, 'nat', 'no', 12],
            [user.extension, 'port', 5060, 13],
            [user.extension, 'qualify', 'yes', 14],
            [user.extension, 'qualifyfreq', 60, 15],
            [user.extension, 'transport', 'udp,tcp,tls', 16],
            [user.extension, 'avpf', 'no', 17],
            [user.extension, 'force_avp', 'no', 18],
            [user.extension, 'icesupport', 'no', 19],
            [user.extension, 'encryption', 'no', 20],
            [user.extension, 'videosupport', 'inherit', 21],
            [user.extension, 'namedcallgroup', '', 22],
            [user.extension, 'namedpickupgroup', '', 23],
            [user.extension, 'disallow', '', 24],
            [user.extension, 'allow', '', 25],
            [user.extension, 'accountcode', '', 27],
            [user.extension, 'deny', '0.0.0.0/0.0.0.0', 28],
            [user.extension, 'permit', '0.0.0.0/0.0.0.0', 29],
            [user.extension, 'secret_origional', '', 30],
            [user.extension, 'sipdriver', 'chan_sip', 31],
            [user.extension, 'account', user.extension, 32],
            [user.extension, 'callerid', 'device<' + user.extension + '>', 33]
        ];
        var users_val = {
            extension: user.extension,
            password: hashed_password,
            name: user.name
        };
        var device_val = {
            id: user.extension,
            tech: 'sip',
            dial: 'SIP/' + user.extension,
            devicetype: 'fixed',
            Description: user.name
        };
        var userman_sql = 'INSERT INTO userman_users SET ?';
        var userman_val = {
            auth: 'freepbx',
            username: user.extension,
            description: 'Autogenerated user on new device creation',
            password: '',
            default_extension: user.extension,
            displayname: user.name
        }
        async.parallel([
                function (callback) {
                    db.exec(users__sql, users_val, function (err, results) {
                        if (err) {
                            res.status(500);
                        }
                    });
                },
                function (callback) {
                    db.exec(sip_sql, [sip_val], function (err, results) {
                        if (err) {
                            res.status(500);
                        }
                    });
                },
                function (callback) {
                    db.exec(device_sql, device_val, function (err, results) {
                        if (err) {
                            res.status(500);
                        }
                    });
                },
                function (callback) {
                    db.exec(userman_sql, userman_val, function (err, results) {
                        if (err) {
                            res.status(500);
                        }
                    });
                }
            ],
            // optional callback
            function (err, results) {
                if (err) {
                    res.status(500);
                }
            });
        res.redirect('/user');
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
                res.render('user/profile', {
                    title: 'Profile',
                    rows: results
                });
            }
        });
    },
    user_display: function (req, res) {
        var extension_id = req.params.id;
        var users_sql = 'SELECT * FROM users WHERE extension=?';
        db.exec(users_sql, extension_id, function (err, results) {
            if( err ){
                    res.status(500);
                } else {
                //console.log(results);
                res.render('profile', {
                    title: 'User Dashboard',
                    rows: results
                });
            }
        });
    }
}