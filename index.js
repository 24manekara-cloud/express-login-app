const express = require("express");
const app = express();
const path = require("path");

// const userLoginRouter = require("./Routes/userLogin");
// const userVerificationRouter = require("./Routes/userVerification");

/* Middleware */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/* Routes */
// app.use("/login", userLoginRouter);
// app.use("/verify", userVerificationRouter);

/* Home route */
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "Templates", "loginPage.html"));
// });
app.get("/", (req, res) => {
    res.send("<h1>Server Working</h1>");
});
/* Server */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});