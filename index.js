const express = require("express");
const app = express();
const path = require("path");

const userLoginRouter = require("./Routes/userLogin");
const userVerificationRouter = require("./Routes/userVerification");
const login=require("./Templates/loginPage.html");

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve frontend files */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
app.use("/login", userLoginRouter);
app.use("/verify", userVerificationRouter);
app.get("/login",(req,res)=>{
    res.send("login");
})


/* Home route */
app.get("/", (req, res) => {
    res.send("Home page");
});

/* Server */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});