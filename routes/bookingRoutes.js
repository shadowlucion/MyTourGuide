const express = require("express");
const router = express.Router();
const reviewRouter = require("./reviewRoutes");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

router.get(
  "/checkout-session/:tourID",
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
