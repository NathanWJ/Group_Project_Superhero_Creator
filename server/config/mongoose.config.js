const mongoose = require('mongoose'); //Needed to use Mongoose library

//Name of database:
const dbName = "superhero_db";

mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to database: ${dbName}`))
    .catch(err => console.log(`Check config.js file. Error connecting to database`, err)
);
