const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/userController");

router.post("/login", login);

// (Optional) Only for super admin setup
router.post("/register", register);

module.exports = router;
