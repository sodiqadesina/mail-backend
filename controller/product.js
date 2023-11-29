const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');
const { dataUri } = require('../config/multer');
const { uploader } = require('../config/cloudinary');

const sendRequest = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);

    res.json(req.file);

}
/**
 * @description This function creates a new product into the database
 * @param {Object, Object, Function} req and res object for the endpoint and next function to be called at the end.
 * @type {function(*=, *=, *=): Promise<unknown>}
 * @returns {JSON} the json response after running the function
 */

const createProduct = asyncHandler(async(req,res,next)=> {
    req.body.owner = req.user.id;

    // Cloudinary Comes in here
    // console.log(req.file);
    // console.log(req.body);

    const productObj = {
        owner: req.body.owner,
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        price: req.body.price,
        category: req.body.category
    }
    if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(async result => {
            console.log(result);
            productObj.mainImage = result.url;
            console.log(productObj);
            const product = await Product.create(productObj);
            return res.status(200).json({
                success: true,
                message: 'Your image has been uploaded to cloudinary',
                data: {
                    product
                }
            })
        }).catch(err => res.status(400).json({
            message: 'Something went wrong while processing your request',
            data: { err }
        }));
    }
})
const getProducts = asyncHandler(async(req,res,next)=> {
    res.status(200).json(res.advancedResults)
})

const getProduct = asyncHandler(async(req,res,next)=> {
    const product = await Product.findOne({slug: req.params.slug})
    if (!product) {
        return next( new ErrorResponse('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        data:product
    })
})
const updateProduct = asyncHandler(async(req,res,next)=> {
    if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(async result => {
            console.log(result);
            req.body.mainImage = result.url;
            const product = await Product.findOneAndUpdate({slug:req.params.slug},req.body,{
                new: true,
                runValidators: true
            })
            return res.status(200).json({
                success: true,
                message: 'Your image has been uploaded to cloudinary',
                data: {
                    product
                }
            })
        }).catch(err => res.status(400).json({
            message: 'Something went wrong while processing your request',
            data: { err }
        }));
    }
    else{
        const product = await Product.findOneAndUpdate({slug:req.params.slug},req.body,{
            new: true,
            runValidators: true
        })
        if (!product) {
            return next( new ErrorResponse('Product not found', 404))
        }
        res.status(200).json({
            success: true,
            data:product
        })
    }
})

//@desc  Delete User
//@route DELETE /api/v1/user/:id
//@access Private/Admin

const deleteProduct = asyncHandler(async(req,res,next)=> {
    await Product.findOneAndRemove({slug:req.params.slug})
    res.status(200).json({
        success: true,
        data: {}
    })
})
module.exports = { sendRequest, createProduct, getProducts, getProduct, updateProduct, deleteProduct}
