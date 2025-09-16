const express = require('express')
const { insertSampleProducts, getProductsStats, deleteAllProducts } = require('../controllers/product-contoller')

const router = express.Router();

router.post('/add', insertSampleProducts);
router.get('/stats', getProductsStats);
router.delete('/delete', deleteAllProducts);

module.exports = router;