const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { findOneAndUpdate } = require('../models/productModel');
const upload = require('../middleware/upload');

//middleware=//auth.verifyUser//auth.verifyAdmin
router.post('/product/insert', upload.single('pImage'), auth.verifyUser, auth.verifyAdmin, function (req, res) {

    if (req.file == undefined) {
        return res.status(202).json({ message: "Invalid File!", success: false })
    }

    const pName = req.body.pName
    const pDesc = req.body.pDesc
    const pPrice = req.body.pPrice
    const pImage = req.file.path
    const pRating = parseInt(req.body.pRating)
    
    

    const productData = new Product({ pName: pName, pDesc: pDesc, pPrice: pPrice, pImage: pImage, pRating: pRating })
    productData.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: "Product Inserted!" })
        })
        .catch(function (e) {
            console.log(e)
            res.status(500).json({ error: e })
        })
})

//updating
router.put('/product/update', upload.single('pImage'), auth.verifyUser, auth.verifyAdmin, function (req, res) {
    if (req.file == undefined) {
        return res.status(202).json({ message: "Invalid File!", success: false })
    }

    const id = req.body.id;
    const pName = req.body.pName;
    const pDesc = req.body.pDesc;
    const pPrice = req.body.pPrice;
    const pImage = req.file.path;
    const pRating = req.body.pRating;

    Product.updateOne({ _id: id }, {
        pName: pName,
        pDesc: pDesc,
        pPrice: pPrice,
        pImage: pImage,
        pRating: pRating
    })
        .then(function (result) {
            res.status(201).json({ message: "Product updated successful.", success: true })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        });
})

//deleting
router.post('/product/delete', auth.verifyUser, auth.verifyAdmin, function (req, res) {
    const id = req.body.id;
    Product.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Product Deleted!", success: true })
        })
        .catch(function (e) {
            res.status(404).json({ error: e })
        })
})

// gives all products
router.get('/product/showAll', function (req, res) {
    Product.find()
        .then(function (data) {
            res.status(200).json({ success: true, data: data })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})

router.get('/product/single/:id', function (req, res) {
    const id = req.params.id;
    Product.findOne({ _id: id })
        .then(function (data) {
            res.status(200).json({ data: data })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})

module.exports = router