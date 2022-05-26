const express = require("express")
const router = express.Router()
const collectionController = require("../controller/collectionController")

router.route("/").post(collectionController.createCollection)

module.exports = router
