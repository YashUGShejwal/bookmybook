const mongoose =require('mongoose')
const Schema=mongoose.Schema
const RatingSchema =new mongoose.Schema({
    userid:{
        type: Schema.Types.ObjectId,
        ref : "USER"
    },
    bookid:{
        type: Schema.Types.ObjectId,
        ref : "BOOK"
    },
    rating:{
        type:Number,
        enum:{
            values:[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
            message:"Bruh rating isn't valid"
        }
    }
})

const Rating = mongoose.model("RATINGS",RatingSchema)

module.exports=Rating