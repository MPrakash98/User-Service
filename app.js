const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
require("./models/user.js");

const app = express();
const PORT = 3000; // Get port from env or declare here static

//CORS middleware
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
var cors = require('cors');
app.use(cors())
app.use(allowCrossDomain);
app.use(express.json());

//take the raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //search the extended true vs false
app.use(cookieParser()); //populates req.cookies with any cookies that came along with the request

// Routes declared for modules
var usersRouter = require('./routes/userRoutes');

//Default Routes
app.use('/api', usersRouter)

// Function to connect the db and starting the server on desired port
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017"
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();