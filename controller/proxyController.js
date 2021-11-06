// @desc: register new user
// @route: POST /api/users/register

const axios = require("axios")

// @access: public
exports.proxyController = async (req, res) => {
  try {
    const axiosConfig = {
      url: req.query.url,
      method: req.method,
      // distinguish between custom and standard headers, propagate custom only
      //   headers: req.headers,
      params: req.params,
      data: req.data,
    }
    const response = await axios(axiosConfig)
    // console.log(response.headers)
    const proxyResponse = {
      originalData: response.data,
      originalHeaders: response.headers,
    }
    res.status(response.status).send(proxyResponse)
  } catch (error) {
    res.send(error)
  }
}
