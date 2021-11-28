const express = require('express')
const router = express.Router()
const workspaceController = require('../controller/workspaceController')

router.route('/').post(workspaceController.createWorkspace)
router
  .route('/:id')
  .get(workspaceController.getWorkspaceById)
  .delete(workspaceController.deleteWorkspace)
router.route('/getall/:userId').get(workspaceController.getUsersWorkspaces)

module.exports = router
