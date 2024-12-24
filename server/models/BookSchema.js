const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required:true,
  },
  image: {
    type: String,
  },  
  author: {
    type: String,
    required:true
  },
  rentPrice: {
    type: String,
    required:true
  },
  rating:{
    type:Number,
    enum:[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
    default:0
  },
  numratings:{
    type:Number,
    required:true,
    default:1
  },
  stock:{
    type:Number
  }
});

const Book = mongoose.model("BOOK", bookSchema);

module.exports = Book; 