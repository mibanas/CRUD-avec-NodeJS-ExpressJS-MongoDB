var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/user.controller')

/* GET All users. */
router.get('/', userControllers.allUsers)

/* POST : login user. */
router.post('/login', userControllers.login);

/* POST : Add user. */
router.post('/', userControllers.register);


/* GET : One user. */
router.get('/:id', userControllers.oneUser)

/* DELETE : delete category. */

/* PUT : update category. */
router.put('/:id', )

/* PATCH : edit category. */
router.patch('/:id', )

module.exports = router