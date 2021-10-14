const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/validateUserName", userController.validateUserName);
router.get("/allData", userController.allusers);


module.exports = router;
