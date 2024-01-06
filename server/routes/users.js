const express = require("express");
const { body } = require("express-validator");

const {
  loginUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const route = express.Router();

route.post(
  "/login",
  [
    body("email")
      .isEmail()
      .trim()
      .escape()
      .withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password field cannot be empty"),
  ],
  loginUser
);

route.get("/", protect, getUser);
route.get("/all", getAllUsers);

module.exports = route;
