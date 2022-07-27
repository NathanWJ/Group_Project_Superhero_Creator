const mongoose = require('mongoose');

//initializing new schema for users
const UserSchema = new mongoose.Schema({
    //setting model to accept data types and other params
            firstName: {
                type: String,
                required: [true,"First name is required."],
                minLength: [2, "First name must be at least 2 characters."]
            },
            lastName: {
                type: String,
                required: [true, "Last name is required."],
                minLength: [2, "Last name ust be at least 2 characters."]
            },
            email: {
                type: String,
                required: [true, "Email is required."],
                unique: [true, "An account already exists with that email."]
            },
            password: {
                type: String,
                required: [true, "Password is required."],
                minLength: [4, "Password must be at least 4 characters."]
            }
        },
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);
