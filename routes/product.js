const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const advancedResults = require('../middleware/advancedRequest');
const { protect, authorize } = require('../middleware/auth');
const { sendRequest, createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controller/product');
const { multerUploads } = require('../config/multer');

// authorize('admin'),
router.route("/")
    .post(protect, multerUploads, createProduct)
    .get(advancedResults(Product, "category"), getProducts)

// router.post('/', multerUploads, sendRequest);

router.route("/:slug")
    .get(getProduct)
    .put(protect, multerUploads, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct)

module.exports = router;
