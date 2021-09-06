const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    pName: { type: String },
    pDesc: { type: String },
    pPrice: { type: String },
    pImage: { type: String },
    pRating: { type: Number }
})

module.exports = Product;