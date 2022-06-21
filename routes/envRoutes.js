const express = require('express')
const {
  createEnv,
  updateEnv,
  deleteEnv,
  getEnv,
} = require('../controller/envController')
const { auth } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(createEnv)
router
  .route('/:id')
  .get(auth, getEnv)
  .put(auth, updateEnv)
  .delete(auth, deleteEnv)

module.exports = router
