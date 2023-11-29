const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');
const advancedResults = require('../middleware/advancedRequest');
const { protect, authorize } = require('../middleware/auth');
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder, getOrderByPk } = require('../controller/order');

router.get("/pk/:id", protect, authorize("admin"), getOrderByPk)
router.route("/")
    .post(protect, authorize('customer'), createOrder)
    .get(protect, advancedResults(Order, "owner"), getOrders)

router.route("/:id")
    .get(protect, getOrder)
    .put(protect, updateOrder)
    .delete(protect, deleteOrder)
module.exports = router;