const Env = require('../model/environmentModel')
const asyncHandler = require('express-async-handler')

// @description: Create new environment
// @route: POST /api/env
// @access: Public
exports.createEnv = asyncHandler(async (req, res) => {
  const { name, user, variables } = req.body
  const env = await Env.create({
    name,
    user,
    variables,
  })

  if (env) {
    res.status(201).json({
      _id: env._id,
      name: env.name,
      user: env.user,
      variables: env.variables,
    })
  } else {
    res.status(400)
    throw new Error('Invalid ENV data')
  }
})

// @description: Get Env by Id
// @route: GET /api/env/:id
// @access: Private
exports.getEnv = asyncHandler(async (req, res) => {
  const env = await Env.findById(req.params.id)

  if (env) {
    res.status(200).json(env)
  } else {
    res.status(404)
    throw new Error(`Could not find ENV, id: ${req.params.id}`)
  }
})

// @description: Update environment
// @route: POST /api/env/:id
// @access: Private
exports.updateEnv = asyncHandler(async (req, res) => {
  const env = await Env.findById(req.params.id)

  if (env) {
    env.name = req.body.name || env.name
    env.user = req.body.user || env.user
    env.variables = req.body.variables || env.variables

    const updatedEnv = await env.save()
    res.status(200).json(updatedEnv)
  } else {
    res.status(404)
    throw new Error(`Could not find ENV, id: ${req.params.id}`)
  }
})

// @description: Delete environment
// @route: DELETE /api/env/:id
// @access: Private
exports.deleteEnv = asyncHandler(async (req, res) => {
  const env = await Env.findById(req.params.id)

  if (env) {
    await env.remove()
    res.status(204)
  } else {
    res.status(404)
    throw new Error(`Could not find ENV, id: ${req.params.id}`)
  }
})
