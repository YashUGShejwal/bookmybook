const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  books:[{  
         
          type: Schema.Types.ObjectId,
          ref: "BOOK",
       
    }
  ],
  totalPrice: {
    type: Number,
  },
  Address:    {
        address:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:Number
        }
    },
  isOutForDelivery:{
    type:Boolean,
    default:false
  },
  isDelivered:{
    type:Boolean,
    default:false
  },
  isReturned:{
    type:Boolean,
    default:false
  }
});

const Order = mongoose.model("ORDER", orderSchema);

module.exports = Order; 