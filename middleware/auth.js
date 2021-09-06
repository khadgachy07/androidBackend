const jwt = require("jsonwebtoken");
const UserAccount = require("../models/accountModel");

//guard or all kind of users
module.exports.verifyUser = function (req, res, next) {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'secretkey')
        
        UserAccount.findOne({ _id: userData.accID })
            .then(function (result) {
              
                req.result = result;

                next();
            })
            .catch(function (e) {
                console.log(e)
                res.status(401).json({ message: "Authentication Failed." })
            })
    } catch (err) {
        console.log("Here",err)
        res.status(401).json({ message: "Authentication Failed." })
    }
}

//guard for admin
module.exports.verifyAdmin = function (req, res, next) {
    if (!req.result) {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    else if (req.result.userType !== 'Admin') {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    next()
}

//another guard for customer
module.exports.verifyCustomer = function (req, res, next) {
    if (!req.UserAccount) {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    else if (req.UserAccount.userType !== 'Customer') {
        return res.status(401).json({ message: "Unauthorized User!" })
    }
    next()
}