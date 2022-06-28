const User = require('../model/userModel')
const Workspace = require('../model/workspaceModel')
const Request = require('../model/requestModel')
const Collection = require('../model/collectionModel')
const Env = require('../model/environmentModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const defaults = require('../utils/defaults')

// @description: Register new user
// @route: POST /api/users/register
// @access: Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    // send confirmation email
    // sendConfirmationEmail(user.email, user.name, user._id, "register")

    // setup default workspace --------------------------------------------

    // get boilerplate workspace

    const workspace = await Workspace.create({
      name: 'My first project',
      users: [user._id],
      collections: [],
      requests: [],
      openRequests: [],
    })

    // create exemplary requests
    const userData = {
      userId: user._id,
      createdBy: user._id,
      lastModifiedBy: user._id,
    }

    const [t1, t2, t3, p1, p2, p3] = await Promise.all([
      Request.create({ ...defaults.todos[0], ...userData }),
      Request.create({ ...defaults.todos[1], ...userData }),
      Request.create({ ...defaults.todos[2], ...userData }),
      Request.create({ ...defaults.posts[0], ...userData }),
      Request.create({ ...defaults.posts[1], ...userData }),
      Request.create({ ...defaults.posts[2], ...userData }),
    ])

    // create collections, assign requests

    const colTodo = {
      name: 'To-do list endpoints',
      user: user._id,
      workspace: workspace._id,
      requests: [t1._id, t2._id, t3._id],
    }
    const colPosts = {
      name: 'Blog endpoints',
      user: user._id,
      workspace: workspace._id,
      requests: [p1._id, p2._id, p3._id],
    }
    const [c1, c2] = await Promise.all([
      Collection.create(colTodo),
      Collection.create(colPosts),
    ])

    // create exemplary environment

    const env = await Env.create({
      name: 'JSON Placeholder',
      user: user._id,
      variables: [
        { key: 'URL', value: 'https://jsonplaceholder.typicode.com' },
        { key: 'ID', value: '1' },
      ],
    })

    // update workspace

    workspace.collections = [c1._id, c2._id]
    workspace.requests = []
    workspace.openRequests = [t1._id, t2._id, t3._id]
    workspace.selectedRequest = t1._id
    workspace.environment = env._id

    const updatedWorkspace = await workspace.save()

    // finally update user

    user.workspaces = [workspace._id]
    user.workspaceActive = workspace._id

    const updatedUser = await user.save()

    // send response with token

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      workspaces: updatedUser.workspaces,
      workspaceActive: updatedUser.workspaceActive,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @description: Login user & send token
// @route: POST /api/users/login
// @access: Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      workspaceActive: user.workspaceActive,
      workspaces: user.workspaces,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @description: Get user profile
// @route: GET /api/users/profile
// @access: Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description: Update user profile
// @route: PUT /api/users/profile
// @access: Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSuperAdmin: updatedUser.isSuperAdmin || false,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description: Get all users
// @route: GET /api/users
// @access: Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @description: Delete user
// @route: DELETE /api/users/:id
// @access: Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (!user.isSuperAdmin) {
      await user.remove()
      res.json({ message: 'User deleted' })
    } else {
      res.status(401).json({
        message:
          'Superadmin settings cannot be changed from this permission tier.',
      })
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description: Get user by ID
// @route: GET /api/users/:id
// @access: Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description: Update user
// @route: PUT /api/users/:id
// @access: Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
