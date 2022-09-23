const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthenticatedError, CustomError } = require("../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  const undoJWT = jwt.verify(token, process.env.JWT_SECRET);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const isPasswordCorrect = await user.comparePassword(newPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    throw new CustomError(err);
  }
};

module.exports = { register, login };
