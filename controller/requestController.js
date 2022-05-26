const Request = require("../model/requestModel")
const asyncHandler = require("express-async-handler")

// @description: Add new request
// @route: POST /api/request
// @access: Public
exports.addRequest = asyncHandler(async (req, res) => {
  const {
    userId,
    reqUrl,
    reqName,
    reqMethod,
    reqHeaders,
    reqQueries,
    proxy,
    reqBody,
  } = req.body
  if (!userId) res.status(400).json({ message: "Invalid request data" })

  const request = await Request.create({
    reqName,
    reqMethod,
    userId,
    reqUrl,
    reqHeaders,
    reqQueries,
    proxy,
    reqBody,
    createdBy: userId,
    lastModifiedBy: userId,
  })

  if (request) {
    res.status(201).json(request)
  } else {
    res.status(500)
    throw new Error("Error creating request")
  }
})

// @description: Edit/update request
// @route: PUT /api/request/:id
// @access: Private
exports.editRequest = asyncHandler(async (req, res) => {
  const reqId = req.params.id
  const { userId, config } = req.body

  if (!userId || !config)
    res.status(400).json({ message: "Invalid request data" })

  const request = await Request.findById(reqId)

  if (request) {
    request.requestConfig = config || request.requestConfig
    request.lastModifiedBy = userId

    const updatedRequest = await request.save()

    res.status(200).json(updatedRequest)
  } else {
    res.status(500)
    throw new Error("Error updating request")
  }
})

// @description: Delete request
// @route: DELETE /api/request/:id
// @access: Private
exports.deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
  if (request) {
    await request.remove()
    res.status(204).json({ message: "Request deleted" })
  } else {
    res.status(404)
    throw new Error("Request not found")
  }
})

// @description: Get request by ID
// @route: GET /api/request/:id
// @access: Private
exports.getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
  if (request) {
    res.status(200).json(request)
  } else {
    res.status(404)
    throw new Error("Request not found")
  }
})
