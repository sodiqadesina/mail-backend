const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');

//@desc  Get All Users
//@route GET /api/v1/user/
//@access Private/Admin

const getCategories = asyncHandler(async(req,res,next)=> {
    res.status(200).json(res.advancedResults)
})

//@desc  Get Single User
//@route GET /api/v1/user/:id
//@access Private/Admin

const getCategory = asyncHandler(async(req,res,next)=> {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next( new ErrorResponse('category not found', 404))
    }
    res.status(200).json({
        success: true,
        data:category
    })
})

//@desc  Create User
//@route POST /api/v1/user/
//@access Private/Admin

const createCategory = asyncHandler(async(req,res,next)=> {
    const category = await Category.create(req.body)
    res.status(200).json({
        success: true,
        data:category
    })
})

//@desc  Update User
//@route GET /api/v1/user/:id
//@access Private/Admin

const updateCatrgory = asyncHandler(async(req,res,next)=> {
    const category = await Category.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data:category
    })
})

//@desc  Delete User
//@route DELETE /api/v1/user/:id
//@access Private/Admin

const deleteCategory = asyncHandler(async(req,res,next)=> {
    await Category.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success: true,
        data: {}
    })
})

module.exports = { getCategories, getCategory, createCategory, updateCatrgory, deleteCategory}