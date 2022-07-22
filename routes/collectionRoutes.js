const express = require('express')
const router = express.Router()
const collectionController = require('../controller/collectionController')

router.route('/').post(collectionController.createCollection)
router
  .route('/:id')
  .get(collectionController.getCollectionById)
  .put(collectionController.updateCollection)
  .delete(collectionController.deleteCollection)

module.exports = router
