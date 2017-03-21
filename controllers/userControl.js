var User = require('../models/user');
var async = require('async');
// Display list of all users
exports.user_list = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        User.show(req, res);
    }
    else {
        res.redirect('/');
    }
};
// Display detail page for a specific user
exports.user_detail = function (req, res, next) {
        User.user_login(req, res);
};
// Display detail page for a specific user
exports.user_details = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        User.user_display(req, res);
    }
    else {
        res.redirect('/');
    }
};

// Display user create form on GET
exports.user_create_get = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        User.user_register(req, res);
    }
    else {
        res.redirect('/');
    }
};

// Handle user create on POST
exports.user_create_post = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        req.checkBody('name', 'Username is Required.').notEmpty();
        req.checkBody('name', 'Username should contains only Alpanumeric words.').isAlpha();
        req.checkBody('extension', 'Extention is required.').notEmpty();
        req.checkBody('secret', 'Password is required').optional({
            checkFalsy: true
        }).notEmpty();

        req.sanitize('name').escape();
        req.sanitize('secret').escape();
        req.sanitize('name').trim();
        req.sanitize('secret').trim();

        var errors = req.validationErrors();

        var user = {
            name: req.body.name,
            extension: req.body.extension,
            password: req.body.secret,

        };
        if (errors) {
            res.render('register', {
                title: 'Add User',
                user: user,
                errors: errors
            });
            return;
        } else {
            // Data from form is valid
            User.save(req, res, user);
        }
    }
    else {
        res.redirect('/');
    }
};

// Display user delete form on GET
exports.user_delete_get = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        User.remove(req, res, next);
    }
    else {
        res.redirect('/');
    }
};

// Handle user delete on POST
exports.user_delete_post = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        res.send('NOT IMPLEMENTED: user delete POST' + user.iduser);
    }
    else {
        res.redirect('/');
    }
};

// Display user update form on GET
exports.user_update_get = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        res.send('NOT IMPLEMENTED: user update GET');
    }
    else {
        res.redirect('/');
    }
};

// Handle user update on POST
exports.user_update_post = function (req, res, next) {
    sess = req.session;
    if (sess.User) {
        res.send('NOT IMPLEMENTED: user update POST');
    }
    else {
        res.redirect('/');
    }
};