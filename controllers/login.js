var Auth = require('../models/authenticate');
exports.authenticate = function (req, res, next) {
   Auth.authorize(req, res);
};
exports.authenticate_user = function (req, res, next) {
   Auth.authorize_user(req, res);
};

