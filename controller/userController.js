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
