const mongoose = require('mongoose');

//	_id filed created automatically. Don't need to add it into schema. 
//TODO: Ensure the below schema values match the form values (client > src > components > form.js)
const HeroSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Your superhero name is required."],
            minLength: [3, "Your superhero name must be at least 3 characters."]
        },
        powers: {
            type: String,
            required: [true, "Your superhero's power(s) can't be blank."],
            minLength: [3, "Your superhero power must be at least 3 characters."]
        },
        weakness: {
            type: String,
            required: [true, "Your superhero's weakness(s) can't be blank."],
            minLength: [3, "Your superhero weakness must be at least 3 characters."]
        }
    },
    { timestamps: true }	
);

module.exports = mongoose.model('Hero', HeroSchema);
