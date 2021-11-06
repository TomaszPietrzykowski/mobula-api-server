// @desc: proxy user request
// @route: /api/proxy
// @query: url: string

const axios = require("axios")
const getCustomHeaders = (headers) => {
  const headersArray = Object.entries(headers)
    .filter(([key, value]) => {
      return key.startsWith("mobula-proxy-")
    })
    .map(([key, value]) => {
      return { [key.toString().replace("mobula-proxy-", "")]: value }
    })
  let headersObj = {}
  headersArray.forEach((entry) => {
    headersObj = { ...headersObj, ...entry }
  })
  return headersObj
}
// @access: public
exports.proxyController = async (req, res) => {
  try {
    const axiosConfig = {
      url: req.query.url,
      method: req.method,
      headers: getCustomHeaders(req.headers),
      params: req.params,
      data: req.data,
    }
    const response = await axios(axiosConfig)
    const proxyResponse = {
      originalData: response.data,
      originalResponseHeaders: response.headers,
      proxyRequestHeaders: response.request._header,
    }
    res.status(response.status).send(proxyResponse)
  } catch (error) {
    res.send(error)
  }
}
