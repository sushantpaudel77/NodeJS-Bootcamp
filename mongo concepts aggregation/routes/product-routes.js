const express = require('express')
const { insertSampleProducts, getProductsStats, deleteAllProducts, getProductsAnalaysis } = require('../controllers/product-contoller')

const router = express.Router();

router.post('/add', insertSampleProducts);
router.get('/stats', getProductsStats);
router.delete('/delete', deleteAllProducts);
router.get('/filter', getProductsAnalaysis);

module.exports = router;