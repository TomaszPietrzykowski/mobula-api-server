const Workspace = require('../model/workspaceModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const Request = require('../model/requestModel')
const Collection = require('../model/collectionModel')
const Env = require('../model/environmentModel')

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
    environment,
  } = req.body
  const workspace = await Workspace.create({
    name,
    users,
    collections,
    requests,
    openRequests,
    selectedRequest,
    environment,
  })

  if (workspace) {
    const user = await User.findById(workspace.users[0])
    user.workspaces = [...user.workspaces, workspace._id]
    user.workspaceActive = workspace._id
    await user.save()
    res.status(201).json(workspace)
  } else {
    res.status(500)
    throw new Error('Error creating workspace')
  }
})

// @description: Update workspace
// @route PUT: /api/workspace/:id
// @access: Private
exports.updateWorkspace = asyncHandler(async (req, res) => {
  const {
    name,
    users,
    collections,
    requests,
    openRequests,
    selectedRequest,
    environment,
    environments,
  } = req.body

  const workspace = await Workspace.findById(req.params.id)

  if (workspace) {
    workspace.name = name || workspace.name
    workspace.users = users || workspace.users
    workspace.collections = collections || workspace.collections
    workspace.requests = requests || workspace.requests
    workspace.openRequests = openRequests || workspace.openRequests
    workspace.selectedRequest = selectedRequest || workspace.selectedRequest
    workspace.environment = environment || workspace.environment
    workspace.environments = environments || workspace.environments

    const updatedWorkspace = await workspace.save()

    res.status(200).json(updatedWorkspace)
  } else {
    res.status(404)
    throw new Error('Error updating workspace: workspace not found')
  }
})

// @description: Delete workspace
// @route DELETE: /api/workspace/:id
// @access: Private
exports.deleteWorkspace = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findById(req.params.id)
  if (workspace) {
    // remove workspace from user object
    const userId = workspace.users[0]
    const user = await User.findById(userId)
    if (user) {
      user.workspaces = Array.isArray(user.workspaces)
        ? user.workspaces.filter(
            (ws) => ws.toString() !== workspace._id.toString()
          )
        : []
      user.workspaceActive =
        user.workspaceActive?.toString() === workspace._id.toString()
          ? null
          : user.workspaceActive

      await user.save()
    }

    // delete all collections
    const collections = workspace.collections
    let requestsFromCollections = []
    if (Array.isArray(collections)) {
      for (let i = collections.length; i > 0; i--) {
        const toBeDeleted = await Collection.findById(collections[i - 1])
        if (Array.isArray(toBeDeleted.requests)) {
          requestsFromCollections = [
            ...requestsFromCollections,
            ...toBeDeleted.requests,
          ]
        }
        await toBeDeleted.remove()
      }
    }
    // delete all requests
    const requests = Array.isArray(workspace.requests)
      ? [...workspace.requests, ...requestsFromCollections]
      : requestsFromCollections
    if (requests.length > 0) {
      for (let i = requests.length; i > 0; i--) {
        const toBeDeleted = await Request.findById(requests[i - 1])
        await toBeDeleted.remove()
      }
    }
    // delete all environments
    console.log(workspace.environments)
    console.log(workspace.environment)
    const env = Array.isArray(workspace.environments)
      ? workspace.environments
      : []
    if (env.length > 0) {
      for (let i = env.length; i > 0; i--) {
        const toBeDeleted = await Env.findById(env[i - 1])
        await toBeDeleted.remove()
      }
    }
    // finally remove workspace itself
    await workspace.remove()

    res.status(204).send()
  } else {
    res.status(404)
    throw new Error('Workspace not found')
  }
})
