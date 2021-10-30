const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.route("/login").post(userController.loginUser)
router.route("/register").post(userController.registerUser)

module.exports = router
