const express = require('express')
const router = express.Router()
const workspaceController = require('../controller/workspaceController')
const { auth } = require('../middleware/authMiddleware')

router.route('/').post(workspaceController.createWorkspace)
router
  .route('/:id')
  .get(auth, workspaceController.getWorkspaceById)
  .delete(auth, workspaceController.deleteWorkspace)
router
  .route('/getall/:userId')
  .get(auth, workspaceController.getUsersWorkspaces)

module.exports = router
