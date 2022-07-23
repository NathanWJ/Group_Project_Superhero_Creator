const User = require ('../models/user.model');

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