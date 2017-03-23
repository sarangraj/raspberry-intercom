var Auth = require('../models/authenticate');
exports.authenticate = function (req, res, next) {
   Auth.authorise(req, res);
};
