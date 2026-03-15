const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).send("Signup successful");
  } catch (error) {
  console.log("SIGNUP ERROR:", error);
  res.status(500).send(error.message);
}});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    res.status(200).send("Login successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while signing in");
  }
});

module.exports = router;