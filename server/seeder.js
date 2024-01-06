// seeder.js
const mongoose = require("mongoose");
const { Users } = require("./models/users");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash("123456abc", salt);
    // Seed a new user
    const newUser = new Users({
      full_name: "Amjad",
      email: "amjad@desolint.com",
      password: encryptPass,
    });

    await newUser.save();
    console.log("User data seeded successfully");
  } catch (error) {
    console.error("Error seeding user data:", error.message);
  }
};

module.exports = seedUsers;
