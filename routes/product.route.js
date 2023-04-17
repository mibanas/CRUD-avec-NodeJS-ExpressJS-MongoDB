var express = require('express');
var router = express.Router();

const productControllers = require('../controllers/product.controller')

/* GET All categories. */
router.get('/', productControllers.allProducts)

/* POST : Add category. */
router.post('/', productControllers.addProduct);

/* GET : search category. */
router.get('/search', productControllers.search)

/* GET : search by segement. */
router.get('/search/:segment', productControllers.searchBySegement)

/* GET : One category. */
router.get('/:id', productControllers.oneProduct)

/* DELETE : delete category. */

/* PUT : update category. */
router.put('/:id', productControllers.updateProduct)

/* PATCH : edit category. */
router.patch('/:id', productControllers.editProduct)




module.exports = router