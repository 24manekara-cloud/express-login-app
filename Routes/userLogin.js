const express = require("express");
const router = express.Router();
const path = require("../Controllers/Services/userValidation");

router.get("/verify", (req, res) => {
    res.send("User login route");
});
router.post("/verify", (req, res) => {
    if (userValidation(req.body)){
        res.send("User data is valid.");
    }
    else{
        res.send("User data is invalid.");
    }
});


module.exports = router;