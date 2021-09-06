const express = require('express');
const router = express.Router();
const UserAccount = require('../models/accountModel');
const { check, validationResult } = require('express-validator');
const nodemon = require('nodemon');
const bcryptjs = require('bcryptjs');
const { get } = require('mongoose');
const jwt = require('jsonwebtoken')

// const test = require('../middleware/test')

//REGISTRATION SYSTEM
router.post('/insert', [
    check('accFN', "First Name cannot be left empty.").not().isEmpty(),
    check('accUN', "Username cannot be left empty.").not().isEmpty(),
    check('accEmail', "Email cannot be left empty.").not().isEmpty(),
    check('accEmail', "Inputted Email is invalid!").isEmail(),
    check('accPhone', "Inputted Phone number is invalid!").isLength({ min: 10 }),
    check('accPwd', "Password cannot be empty.").not().isEmpty(),
    check('accPwd', "Password is too short! (Password should be greater than 6)").isLength({ min: 6 })

],
    function (req, res) {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const accFN = req.body.accFN
            const accUN = req.body.accUN
            const accEmail = req.body.accEmail
            const accPhone = req.body.accPhone
            const accPwd = req.body.accPwd
            const userType = req.body.userType

            console.log('accFN');

            bcryptjs.hash(accPwd, 10, function (err, hash) {

                const data = new UserAccount({
                    accFN: accFN, accUN: accUN,
                    accEmail: accEmail, accPhone: accPhone, accPwd: hash,
                    userType: userType
                })
                data.save()
                    .then(function (result) {
                        //success message with status code
                        res.status(201).json({ success: true, message: true })
                    }).
                    catch(function (err) {
                        console.log(err)
                        res.status(500).json({ success: false, error: err })
                    })
            })
        }
        else {
            //invalid data from client
            res.status(400).json({ success: false, error: errors.array() })
        }
    })

// router.get('/test',test, function(req,res){
//     console.log("this is test request!!")
// })

//LOGIN SYSTEM
router.post('/login', function (req, res) {
    const accUN = req.body.accUN
    const accPwd = req.body.accPwd
    console.log(accUN);
    console.log(accPwd)
    UserAccount.findOne({ accUN: accUN })
        .then(function (userData) {
            
            if (userData === null) {
                //case for not finding username
                return res.status(202).json({ success: false, message: "Username or password is invalid!!!" })

            }
            //Comparing password of login with registered password
            bcryptjs.compare(accPwd, userData.accPwd, function (err, result) {
                if (result === false) {
                    //for correct username but incorrect password
                    return res.status(202).json({ success: false, message: "Username or password is invalid!" })
                }

                // To generate Token
                const token = jwt.sign({ accID: userData._id }, 'secretkey');
                res.status(200).json({ success: true, token: token, message: "Authentication Succeed!", data: userData })
            })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})


module.exports = router;
