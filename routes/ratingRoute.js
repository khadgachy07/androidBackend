const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel.js');
const auth = require('../middleware/auth');
const { updateRating } = require('../utils/userUtils');

router.post('/rate/eg', auth.verifyUser, (req, res) => {
    let rating = parseInt(req.body['rating']);
    let eg_id = req.body['egId'];

    Rating.findOne({ "user_id": req.result._id, "eg_id": eg_id }).then((data) => {
        if (data != null) {


            Rating.updateOne({ "user_id": req.result._id, "eg_id": eg_id }, { $set: { "rating": parseInt(rating), "ratedAt": new Date() } }).then((result) => {

                updateRating(eg_id);
                return res.status(200).json({ "success": true, "message": "Rated!!" });
            }).catch((err) => {
                return res.status(404).json({ "success": false, "message": err });
            })



        }
        else {
            const rate = new Rating({ "user_id": req.result._id, "eg_id": eg_id, "rating": parseInt(rating), "ratedAt": new Date() });
            rate.save().then((result) => {
                updateRating(eg_id);
                return res.status(200).json({ "success": true, "message": "Rated!!" });
            }).catch((err) => {
                return res.status(404).json({ "success": false, "message": err });
            })
        }
    })
})



router.post('/retrieveRating', auth.verifyUser, (req, res) => {
    let egId = req.body.egId;
    Rating.findOne({ "user_id": req.result._id, "eg_id": egId }).then((data) => {
        if (data == null) {
            return res.status(202).json({ "success": false, "message": "Not rated!!", "data": data });
        }
        else {
            return res.status(200).json({ "success": true, "message": "Rated!!", "data": data });
        }
    })
})

module.exports = router;