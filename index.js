const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const { spawn } = require("child_process");

const userLoginRouter = require("./Routes/userVerification");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/calculate", (req, res) => {

//     const python = spawn("python", ["model.py", JSON.stringify(req.body)]);

//     let result = "";

//     python.stdout.on("data", (data) => {
//         result += data.toString();
//     });

//     python.on("close", () => {
//         res.json(JSON.parse(result));
//     });

// });

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