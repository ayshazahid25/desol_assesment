const expressAsyncHandler = require("express-async-handler");
const { Car, validateCar } = require("../models/cars");

// @desc Authenticate a user
// @route POST /api/cars/create
// @access Public
const createCar = expressAsyncHandler(async (req, res) => {
  const { error } = validateCar(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    if (req.files && req.files.length > 0) {
      // Extract URLs from Cloudinary response and store them in the array
      uploadedImages = req.files.map((file) => file.path);
    }
    // Create a new car entry
    const car = new Car({
      user: req.result._id,
      carModel: req.body.carModel,
      price: req.body.price,
      phoneNumber: req.body.phoneNumber,
      maxPictures: req.body.maxPictures,
      pictures: uploadedImages,
    });

    // Save the car entry to the database
    await car.save();

    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc Authenticate a user
// @route GET /api/cars/
// @access Public
const getAllCars = expressAsyncHandler(async (req, res) => {
  try {
    const cars = await Car.find().populate("user", "full_name email");
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = {
  createCar,
  getAllCars,
};
