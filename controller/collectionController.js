const Collection = require('../model/collectionModel')
const asyncHandler = require('express-async-handler')

// @description: Create new collection
// @route POST: /api/collection
// @access: Public
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
