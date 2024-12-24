const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    // min:8
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeliveryBoy: {
    type: Boolean,
    default: false,
  },
  Addresses: [
    {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
  ],
  rentals: [
    {
      isActive: {
        type: Boolean,
        default: true,
      },
      order: {
        type: Schema.Types.ObjectId,
        ref: "ORDER",
      },
    },
  ],
  recommend: [
    {
      type: String,
    },
  ],
  cart: {
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "BOOK",
      },
    ],
    total: {
      type: Number,
      default:0
    },
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
