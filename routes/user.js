var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userControl');
/* GET users listing. */
router.get('/', user_controller.user_list);

/* GET request for one user. */
router.get('/:id', user_controller.user_details);

/* GET request for list of all user items. */
router.post('/login', user_controller.user_detail);

/* GET request for creating a user. NOTE This must come before routes that display user (uses id) */
router.get('/create', user_controller.user_create_get);

/* POST request for creating user. */
router.post('/create', user_controller.user_create_post);

/* GET request to delete user. */
router.get('/delete/:id', user_controller.user_delete_get);

// POST request to delete user
router.post('/delete/:id', user_controller.user_delete_post);

/* GET request to update user. */
router.get('/update/:id', user_controller.user_update_get);

// POST request to update user
router.post('/update/:id', user_controller.user_update_post);

module.exports = router;