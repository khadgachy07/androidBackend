const Product = require('../models/productModel');
const Rating = require('../models/ratingModel');

const updateRating = (Id) => {
    let query = Rating.find({ "eg_id": Id });
    query.then((data) => {
        if (data.length > 0) {
            let ratings = data.map((val) => { return val['rating'] });
            let totalRatings = 0;
            for (var i = 0; i < ratings.length; i++) {
                totalRatings += ratings[i];
            }
            let averageRating = parseInt(Math.round(totalRatings / ratings.length));
            Product.updateOne({ "_id": Id }, { $set: { "pRating": averageRating } }).then((result) => { }).catch((err) => {
                console.log(err);
            })
        }
        else {
            Product.updateOne({ "_id": Id }, { $set: { "pRating": 0 } }).then((result) => { }).catch((err) => {
                console.log(err);
            })
        }
    })
}

module.exports = { updateRating };