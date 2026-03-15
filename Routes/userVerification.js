const express = require("express");
const router = express.Router();
const path = require("path");
const validateUser = require("../Controllers/Services/userValidation");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Templates/verification.html"));
});

router.post("/", (req, res) => {
    const result = validateUser(req.body);

    if (result.valid) {
        res.json({
            success: true,
            message: "User data is valid."
        });
    } else {
        res.json({
            success: false,
            message: result.message
        });
    }
});

module.exports = router;