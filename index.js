const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// USER SCHEMA
// ======================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ======================
// ROUTES
// ======================

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🎵 Anandmay Backend Running"
  });
});

// ======================
// REGISTER
// ======================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});

// ======================
// LOGIN
// ======================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});

// ======================
// PRODUCTS (for dashboard)
// ======================
app.get("/products", (req, res) => {
  res.json([
    {
      name: "Headphones 🎧",
      price: 2499
    },
    {
      name: "Smart Watch ⌚",
      price: 3499
    },
    {
      name: "Shoes 👟",
      price: 1999
    }
  ]);
});

// ======================
// DATABASE CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });