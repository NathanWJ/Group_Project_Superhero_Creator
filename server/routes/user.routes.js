const UserController = require('../controllers/user.controllers');

//route to post newly created user
module.exports = app => {
    app.get('/users', UserController.getAllUsers); //GET request for Dashboard route
    app.post('/users', UserController.createNewUser); //POST Request to db to create user
    app.post('/login', UserController.loginUser); //POST Request to db to check if user exists

}