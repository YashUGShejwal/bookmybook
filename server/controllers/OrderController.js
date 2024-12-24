const { response } = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/UserSchema");
const Order = require("../models/OrderSchema");
const Book = require("../models/BookSchema");

const createOrder = async (req, res) => {
  const { amount } = req.body;
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const resp = instance.orders.create(
    {
      amount: amount,
      currency: "INR",
      receipt: "receipt#1",
    },
    (err, response) => {
      res.send(response);
    }
  );
};

const payment = async (req, res) => {
  // const webhookSecret = process.env.WEBHOOK_SECRET || "";
  // const shasum = crypto.createHmac("sha256", webhookSecret);
  // shasum.update(JSON.stringify(req.body));
  // const digest = shasum.digest("hex");
  // let razorSignature = req.headers["x-razorpay-signature"];
  // if (razorSignature && digest === razorSignature) {
  //     console.log(req.body)
  // //   return res.status(200).json({ ok: true, data: req.body });
  // } else {
  // //   return res.status(200).json({ ok: false });
  // }
  // console.log('PAYMENT DONE');
  // res.redirect('/success');

  console.log("PAYMENT DONE");
  res.redirect("http://localhost:3000/user/home");
};

const addToCart = async (req, res) => {
  const { id } = req.user;
  const { bookID } = req.body;
  try {
    const user = await User.findById(id);
    const book = await Book.findById(bookID);
    let newCart = user.cart;
    newCart.items.push(bookID);
    newCart.total += Number(book.rentPrice);
    const isAdded = await User.findByIdAndUpdate(id, {
      cart: newCart,
    }).populate("cart.items");
    await isAdded.save();
    if (isAdded) {
      res.status(200).send({ message: "Added To Cart", cart: newCart });
    } else {
      res.status(400).send({ message: "Failed To Add To Cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong", error });
  }
};

const removeFromCart = async (req, res) => {
  const { id } = req.user;
  const { bookID } = req.body;
  try {
    const user = await User.findById(id).populate({
      path: "cart",
      populate: "items",
    });

    var reduce = 0;
    const newCart = user.cart.items;
    const updatedCart = newCart.filter((item) => item._id.valueOf() !== bookID);

    console.log(updatedCart);

    const cart = newCart.map((item) => {
      if (item._id.valueOf() === bookID) reduce = Number(item.rentPrice) || 0;
    });

    var total = user.cart.total;
    if (updatedCart.length > 0) {
      total -= reduce;
    }

    const isAdded = await User.findByIdAndUpdate(id, {
      cart: {
        items: updatedCart,
        total,
      },
    });
    if (isAdded) {
      res.status(200).send({
        message: "Removed From Cart",
        cart: {
          items: updatedCart,
          total,
        },
      });
    } else {
      res.status(400).send({ message: "Failed To Remove From Cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong" });
  }
};

const getCart = async (req, res) => {
  const { id } = req.user;
  const getCart = await User.findById(id).populate("cart");
  if (getCart.cart) {
    res.status(200).send({ message: "Cart Fetched", cart: getCart.cart });
  } else {
    res.status(400).send({ message: "Failed to fetch Cart" });
  }
};

const checkout = async (req, res) => {
  const user = req.user;
  let address11;
  if (user) {
    console.log("okay user is verified");
    let cart = user.cart.items;
    console.log(cart, "CART");
    let books = cart?.map((e) => e);
    console.log("books here", books);
    var totalPrice = cart.total;
    var { address, city, state, pincode } = req.body;
    // let addressobj=await user.Addresses
    console.log("ADRESSsf ", user.Addresses);
    let address1 = user.Addresses.filter(
      (e) =>
        e.address == address &&
        e.city == city &&
        e.state == state &&
        e.pincode == pincode
    );
    console.log("now", address);
    if (address1.length !== 0) {
      console.log("is there");
      address11 = { address, city, state, pincode };
    } else {
      console.log("else here");
      let prev = user.Addresses;
      prev.push({ address, city, state, pincode });
      address11 = { address, city, state, pincode };
      const userupdate = await User.findByIdAndUpdate(user.id, {
        Addresses: prev,
      });
    }
    try {
      console.log(address11);

      const order = new Order({
        books,
        totalPrice,
        Address: address11,
        isOutForDelivery: false,
        isDelivered: false,
        isReturned: false,
      });
      const ordersaved = await order.save();
      if (ordersaved) {
        let currrentals = user.rentals;
        currrentals.push({ isActive: true, order: ordersaved });
        console.log("HERE", user);
        const usr = await User.findByIdAndUpdate(user.id, {
          rentals: currrentals,
          cart: {
            items: [],
            total: 0,
          },
        });

        if (usr)
          res
            .status(200)
            .send({ message: "order checked out", orderID: ordersaved._id });
      }
    } catch (error) {
      res.status(403).send({ message: "error occured" });

      console.log("Error occured", error);
    }
  }
  try {
    console.log(address11);
    console.log(books, "heheeheh");

    const order = new Order({
      books,
      totalPrice,
      Address: address11,
      isOutForDelivery: false,
      isDelivered: false,
      isReturned: false,
    });
    const ordersaved = await order.save();
    if (ordersaved) {
      let currrentals = user.rentals;
      currrentals.push({ isActive: true, order: ordersaved });
      console.log("HERE", user);
      const usr = await User.findByIdAndUpdate(user.id, {
        rentals: currrentals,
        cart: {
          items: [],
          total: 0,
        },
      });

      if (usr)
        res
          .status(200)
          .send({ message: "order checked out", orderID: ordersaved._id });
    }
  } catch (error) {
    res.status(403).send({ message: "error occured" });

    console.log("Error occured", error);
  }
};

const getRentals = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id).populate({
    path: "rentals",
    populate: {
      path: "order",
      populate: "books",
    },
  });
  if (user.rentals.length !== 0) {
    res
      .status(200)
      .send({ message: "Fetched All Rentals", rentals: user.rentals });
  } else {
    console.log(user.rentals, "holy moly");
    res.status(403).send({ message: "Something Went Wrong" });
  }
};
const getAllRentals = async (req, res) => {
  try {
    const users = await User.find({}).populate("rentals.order");
    console.log("SIUUU", users);
    const data = [];
    let rentLen = 0;
    users.map((u) => {
      u.rentals.map((r) => {
        console.log(r);
        const val = {
          id: r.order._id,
          username: u.name,
          email: u.email,
          date: r.order.date || new Date(),
          isActive: r.isActive,
        };
        data.push(val);
        if (r.isActive) {
          if (r.order?.books?.length) rentLen += Number(r.order?.books?.length);
          // console.log("HERE",r.order?.books?.length)
        }
      });
    });

    console.log(rentLen);
    const books = await Book.find({});
    let booksLen = books.length;

    // console.log(data);
    res
      .status(200)
      .send({ message: "All rentals recieved", data, booksLen, rentLen });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "some error occurred" });
  }
};
const orderSummary = async (req, res) => {
  const { orderID } = req.params;
  const orderDetails = await Order.findById(orderID).populate("books");
  if (orderDetails)
    res.status(200).send({ message: "Order Summary", orderDetails });
  else {
    res.status(400).send({ message: "Error occurred" });
  }
};
const deliveryData = async (req, res) => {
  try {
    const users = await User.find({}).populate("rentals.order");
    const ordersDelivered = [];
    const ordersYetToBeDelivered = [];
    users.map((u) => {
      u.rentals.map((r) => {
        const val = {
          id: r.order._id,
          username: u.name,
          email: u.email,
          date: r.order.date || new Date(),
        };
        if (r.order.isDelivered) {
          val.isDelivered = true;
          ordersDelivered.push(val);
        } else {
          val.isDelivered = false;

          ordersYetToBeDelivered.push(val);
        }
      });
    });

    res.status(200).send({ ordersDelivered, ordersYetToBeDelivered });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "some error occurred", error });
  }
};
const orderSummaryPost = async (req, res) => {
  const { orderID } = req.body;
  const orderDetails = await Order.findById(orderID).populate("books");
  if (orderDetails)
    res.status(200).send({ message: "Order Summary", orderDetails });
  else {
    res.status(400).send({ message: "Error occurred" });
  }
};


module.exports = {
  createOrder,
  payment,
  addToCart,
  removeFromCart,
  getCart,
  checkout,
  getRentals,
  getAllRentals,
  orderSummary,
  deliveryData,
  orderSummaryPost,
  
};
