const express = require('express')
const router = express.Router()
const proxyController = require('../controller/proxyController')

router.route('/').all(proxyController.proxyController)

module.exports = router
