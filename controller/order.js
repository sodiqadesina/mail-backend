const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Order = require("../models/Orders");
const Product = require("../models/Product");
const otpGenerator = require("otp-generator");

//@desc  Get All Users
//@route GET /api/v1/user/
//@access Private/Admin

const getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc  Get Single User
//@route GET /api/v1/user/:id
//@access Private/Admin

const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorResponse("order not found", 404));
  }
  res.status(200).json({
    success: true,
    data: order,
  });
});

const getOrderByPk = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ pk_id: req.params.id }).populate("owner");
  if (!order) {
    return next(new ErrorResponse("order not found", 404));
  }
  res.status(200).json({
    success: true,
    data: order,
  });
});

//@desc  Create User
//@route POST /api/v1/user/
//@access Private/Admin

const createOrder = asyncHandler(async (req, res, next) => {
  let pk_id = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });
  let pk_present = await Order.findOne({ pk_id });
  while (pk_present) {
    pk_id = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    pk_present = await Order.findOne({ pk_id });
  }
  req.body.owner = req.user.id;
  req.body.pk_id = pk_id;
  const order = await Order.create(req.body);
  products = req.body.products;
  products.forEach((product) => {
    console.log(product);
    Product.findById(product._id, (err, newProduct) => {
      if (err) {
        Product.findByIdAndDelete(order._id);
        return next(new ErrorResponse("order not successful", 400));
      }
      console.log(newProduct);
      if (newProduct.quantities > 0) {
        console.log("Hello World");
        Product.findByIdAndUpdate(
          newProduct._id,
          { quantities: newProduct.quantities - product.quantity },
          { new: true, runValidators: true },
          (error, productUpdate) => {
            if (error) {
              Product.findByIdAndDelete(order._id);
              return next(new ErrorResponse("order not successful", 400));
            }
            console.log(productUpdate);
          }
        );
      }
    });
  });
  res.status(200).json({
    success: true,
    data: order,
  });
});

//@desc  Update User
//@route GET /api/v1/user/:id
//@access Private/Admin

const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("owner");
  res.status(200).json({
    success: true,
    data: order,
  });
});

//@desc  Delete User
//@route DELETE /api/v1/user/:id
//@access Private/Admin

const deleteOrder = asyncHandler(async (req, res, next) => {
  await Order.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByPk,
};
