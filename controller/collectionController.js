const Collection = require('../model/collectionModel')
const asyncHandler = require('express-async-handler')
const Workspace = require('../model/workspaceModel')
const Request = require('../model/requestModel')

// @description: Create new collection
// @route POST: /api/collection
// @access: Private
exports.createCollection = asyncHandler(async (req, res) => {
  const { name, user, workspace, requests } = req.body

  const collection = await Collection.create({
    name,
    user,
    workspace,
    requests,
  })

  if (collection) {
    res.status(201).json(collection)
  } else {
    res.status(500)
    throw new Error('Error creating collection')
  }
})

// @description: Get collection by id
// @route GET: /api/collection/:id
// @access: Private
exports.getCollectionById = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id)

  if (collection) {
    res.status(200).json(collection)
  } else {
    res.status(404)
    throw new Error('Collection not found')
  }
})

// @description: Update collection
// @route PUT: /api/collection/:id
// @access: Private
exports.updateCollection = asyncHandler(async (req, res) => {
  const { name, requests } = req.body

  const collection = await Collection.findById(req.params.id)

  if (collection) {
    collection.name = name
    collection.requests = requests

    const updatedCollection = await collection.save()

    res.status(200).json(updatedCollection)
  } else {
    res.status(404)
    throw new Error('Collection not found')
  }
})

// @description: Delete collection
// @route PUT: /api/collection/:id
// @access: Private
exports.deleteCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id)

  if (collection) {
    // remove from workspace
    const workspace = await Workspace.findById(collection.workspace)
    if (workspace) {
      const filtered = workspace.collections.filter(
        (c) => c.toString() !== collection._id.toString()
      )
      workspace.collections = [...filtered]
      await workspace.save()
    }
    // delete requests
    if (collection.requests.length > 0) {
      for (let i = collection.requests.length; i > 0; i--) {
        const toBeDeleted = await Request.findById(collection.requests[i - 1])
        await toBeDeleted.remove()
      }
    }
    await collection.remove()

    res.status(204).send()
  } else {
    res.status(404)
    throw new Error('Collection not found')
  }
})
