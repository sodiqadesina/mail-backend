const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const advancedResults = require('../middleware/advancedRequest');
const { protect, authorize } = require('../middleware/auth');
const { createCategory, getCategories, getCategory, updateCatrgory, deleteCategory } = require('../controller/category');

// authorize('admin'), 
router.route("/")
    .post(protect, createCategory)
    .get(advancedResults(Category), getCategories)

router.route("/:id")
    .get(getCategory)
    .put(protect, authorize('admin'),updateCatrgory)
    .delete(protect, authorize('admin'),deleteCategory)
module.exports = router;