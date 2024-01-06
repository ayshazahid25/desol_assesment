const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
});

// Joi validation
function validateUser(user) {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string(),
  });
  return schema.validate(user);
}

const Users = mongoose.model("User", userSchema);

exports.Users = Users;
exports.validateUser = validateUser;
