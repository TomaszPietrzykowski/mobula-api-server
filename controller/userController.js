const User = require("../model/userModel")
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")

// @description: Register new user
// @route: POST /api/users
// @access: Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    // send confirmation email
    // sendConfirmationEmail(user.email, user.name, user._id, "register")
    // send response with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})


// @desc: register new user
// @route: POST /api/users/register
// @access: public
exports.registerUser = async (req, res) => {
  res.json({ message: "register hit" })
}

// @desc: log user in
// @route: POST /api/users/login
// @access: public
exports.loginUser = async (req, res) => {
  res.json({ message: "logit hit" })
}
