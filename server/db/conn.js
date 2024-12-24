var mongoose = require('mongoose');
var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" }); 

//Database URI from .env
const MONGODB_URI = process.env.DB;

// For connection with mongodb
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log('No connection with DB');
    console.log(err);
  });
