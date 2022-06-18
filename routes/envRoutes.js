const express = require('express')
const {
  createEnv,
  updateEnv,
  deleteEnv,
} = require('../controller/envController')
const { auth } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(createEnv)
router
  .route('/:id')
  .get(auth, auth)
  .put(auth, updateEnv)
  .delete(auth, deleteEnv)

module.exports = router
