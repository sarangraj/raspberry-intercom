var express = require('express');
var router = express.Router();
var other_controller = require('../controllers/otherControl');
/* GET home page. */
router.get('/', other_controller.about_us);

module.exports = router;
