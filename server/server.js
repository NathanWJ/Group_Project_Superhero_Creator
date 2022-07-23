const express = require("express");
const cors = require('cors'); 
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken");

//Middleware that configures JSON properly to deal with form data 
app.use(express.json(), express.urlencoded({ extended: true }));

//Cors ("cross-origin requests") allows different ports to send requests to our API (e.g. port 3000 to 8000)
app.use(cors({
    origin: "http://localhost:3000"
}));

//Allow requests from any client port with cors presents security concerns
require("./config/mongoose.config");

require("./routes/hero.routes")(app);
require("./routes/user.routes")(app);

//Runs server on specified port
app.listen(port, () => console.log(`SERVER.JS FILE WORKS - Running on: ${port}`));