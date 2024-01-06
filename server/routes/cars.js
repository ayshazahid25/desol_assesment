const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { createCar, getAllCars } = require("../controllers/carController");

const router = express.Router();

router.post(
  "/create",
  protect,
  [
    body("carModel")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Car model must be at least 3 characters"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("phoneNumber")
      .isString()
      .trim()
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone number must be 11 characters"),
    body("maxPictures")
      .isNumeric()
      .isInt({ min: 1, max: 10 })
      .withMessage("Max pictures must be between 1 and 10"),
  ],
  createCar
);

router.get("/", protect, getAllCars);

module.exports = router;
