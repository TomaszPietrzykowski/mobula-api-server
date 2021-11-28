const express = require('express')
const requestController = require('../controller/requestController')
const router = express.Router()

router.route('/').post(requestController.addRequest)
router
  .route('/:id')
  .get(requestController.getRequestById)
  .put(requestController.editRequest)
  .delete(requestController.deleteRequest)

module.exports = router
