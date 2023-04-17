var express = require('express');
var router = express.Router();

const categoryControllers = require('../controllers/category.controller')

/* GET All categories. */
router.get('/', categoryControllers.allcategories)

/* POST : Add category. */
router.post('/', categoryControllers.addcategory);

/* GET : One category. */
router.get('/:id', categoryControllers.oneCategory)

/* DELETE : delete category. */

/* PUT : update category. */
router.put('/:id', categoryControllers.updateCategory)

/* PATCH : edit category. */
router.patch('/:id', categoryControllers.editCategory)

module.exports = router