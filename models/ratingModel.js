const mongoose = require('mongoose');
const { ObjectId } = require('bson');

const Rating = mongoose.model('Rating', {
    "user_id": { "type": ObjectId, "required": true },
    "eg_id": { "type": ObjectId, "required": true },
    "rating": { "type": Number, "required": true },
    "ratedAt": { "type": Date, "required": true }
});

module.exports = Rating;