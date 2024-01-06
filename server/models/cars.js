// models/cars.js
const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carModel: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  pictures: [
    {
      type: String, // Storing URLs of images
    },
  ],
});

const Car = mongoose.model("Car", carSchema);

// Validation function using Joi
function validateCar(car) {
  const schema = Joi.object({
    carModel: Joi.string().min(3).required(),
    price: Joi.number().required(),
    phoneNumber: Joi.string().length(11).pattern(/^\d+$/).required(),
    maxPictures: Joi.number().min(1).max(10).required(),
    pictures: Joi.array().items(Joi.string()),
  });

  return schema.validate(car);
}

module.exports = {
  Car,
  validateCar,
};
