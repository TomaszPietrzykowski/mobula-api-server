const Workspace = require('../model/workspaceModel')
const asyncHandler = require('express-async-handler')

// @description: Get all user's workspaces
// @route: GET /api/workspace/getall/:userId
// @access: Private
exports.getUsersWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({ users: req.params.userId })

  if (workspaces) {
    res.status(200).json(workspaces)
  } else {
    res.status(404)
    throw new Error('No workspaces found')
  }
})

// @description: Get workspace by Id
// @route: GET /api/workspace/:id
// @access: Private
exports.getWorkspaceById = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findById(req.params.id).populate([
    { path: 'openRequests', model: 'Request' },
    { path: 'requests', model: 'Request', select: 'reqName _id reqMethod' },
    {
      path: 'collections',
      model: 'Collection',
      populate: {
        path: 'requests',
        model: 'Request',
        select: 'reqName _id reqMethod reqUrl',
      },
    },
  ])

  if (workspace) {
    const env = workspace._doc.environment || ''
    res.status(200).json({ ...workspace._doc, env })
  } else {
    res.status(404)
    throw new Error('Workspace not found')
  }
})

// @description: Create new workspace
// @route POST: /api/workspace
// @access: Public
exports.createWorkspace = asyncHandler(async (req, res) => {
  const {
    name,
    users,
    collections,
    requests,
    openRequests,
    selectedRequest,
    env,
  } = req.body
  const workspace = await Workspace.create({
    name,
    users,
    collections,
    requests,
    openRequests,
    selectedRequest,
    env,
  })

  if (workspace) {
    res.status(201).json(workspace)
  } else {
    res.status(500)
    throw new Error('Error creating workspace')
  }
})

// @description: Delete workspace
// @route DELETE: /api/workspace/:id
// @access: Private
exports.deleteWorkspace = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findById(req.params.id)
  if (workspace) {
    await workspace.remove()
    res.status(204).json({ message: 'Workspace deleted' })
  } else {
    res.status(404)
    throw new Error('Workspace not found')
  }
})
