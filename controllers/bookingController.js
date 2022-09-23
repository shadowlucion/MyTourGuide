const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const UserModel = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const Tour = require("./../models/Tour");
const Email = require("./../utils/email");
const bcrypt = require("bcryptjs");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourID);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `http://${req.get("host")}`,
    cancel_url: `http://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
        ],
        amount: tour.price,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  //   // 3) Send back to client
  res.status(200).json({
    status: "success",
    session,
  });
});
