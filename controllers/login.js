var Auth = require('../models/authenticate');
exports.authenticate = function (req, res, next) {
   Auth.authorise(req, res);
};
exports.authenticate_user = function (req, res, next) {
   Auth.authorise_user(req, res);
};

