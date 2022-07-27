const User = require ('../models/user.model');
const jwt = require("jsonwebtoken");

// New user creation controller
module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            console.log(newUser);
            res.json(newUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err });
        });
};

module.exports.getAllUsers = (req, res) => {
    User.find()
    .then(allUsers => {
        console.log(allUsers);
        res.json(allUsers)
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({err})
    })
}

module.exports.loginUser = async (req, res) => {
        const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        const  token = jwt.sign({
            email: user.email
        }, 'AnthonysSecretToken24')
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
}