const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const userLoginRouter = require("./Routes/userVerification");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.log("DB connection error:", err.message));

app.use("/user", userLoginRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Templates", "loginPage.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});