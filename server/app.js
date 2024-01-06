const express = require("express");
var cors = require("cors");
require("dotenv").config();

const user = require("./routes/users");
const cars = require("./routes/cars");
const { errorHandler } = require("./middleware/errorMiddleware");
const seedUsers = require("./seeder");

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.get("/seed-users", async (req, res) => {
  try {
    await seedUsers();
    res.status(200).json({ message: "User data seeded successfully" });
  } catch (error) {
    console.error("Error seeding user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/users", user);
app.use("/api/cars", cars);

const PORT = 6062;

require("./config/db")();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorHandler);
