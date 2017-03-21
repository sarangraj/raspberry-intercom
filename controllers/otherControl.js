var User = require('../models/other');
// Display list of all users
exports.about_us = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        User.show(req, res);
    } 
    else {
          res.redirect('/');
    }
};