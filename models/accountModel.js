const mongoose = require('mongoose');

const UserAccount = mongoose.model('UserAccount', {
    accFN: {
        type: String,
        required: true
    },
    accUN: {
        type: String,
        required: true,
        unique: true
    },
    accEmail: {
        type: String,
        required: true,
        unique: true
    },
    accPhone: {
        type: String,
        required: true,
        unique: true
    },
    accPwd: {
        type: String,
        required: true
    }
    ,
    userType: {
        type: String,
        enum: ['Admin', 'Customer']
    }
})

module.exports = UserAccount