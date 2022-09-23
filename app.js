// Imports...
const path = require("path");
// Importing Downloaded Modules
require("dotenv").config();
// require('express-async-errors')
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Importing DBMS
const connectDB = require("./db/connect");
// const mainRouter = require('./routes/main')

// Importing Middleware
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

// Importing Routes
const authRouter = require("./routes/authRoutes");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
// const jobRouter = require('./routes/jobs')

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error");

// Global Middleware
// Security headers

app.use(
  cors({
    origin: "http://127.0.0.1:3000/",
  })
);

app.use(
  helmet({
    crossOriginEmbedderPolicy: true,
  })
);

// Limit Request from an IP
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60*60*1000,
//   message: 'Too many request from this IP, Please try again later in an hour!'
// });
// app.use('/api',limiter);

// // Parse body data to json and we can include some options too.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// //  Data sanitization again NoSQL queries injection
app.use(mongoSanitize());

// // Data sanitize against XSS (Basically remove html + javascript code send from the user.)
app.use(xss());

// (HTTP Parameter Pollution) It simply remove all duplicate fields and unwanted ones.
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// // Use middleware
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use((req,res,next)=>{
//   console.log(req.cookies)
//   next()
// })

app.use("/", viewRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

// app.use(notFound)
// app.use(errorHandler)
// app.use(express.static('./public'))
// app.use(express.static(path.join(__dirname,'public')))

// Move to the top (Errors like console.log(x) where x is not defined)
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// console.log(x); uncaughtException

// creating server...
const port = 3000;
var server = null;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server = app.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
