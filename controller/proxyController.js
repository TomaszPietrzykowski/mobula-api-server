// @desc: proxy user request
// @route: /api/proxy
// @query: url: string

const axios = require('axios')
const getCustomHeaders = (headers) => {
  const headersArray = Object.entries(headers)
    .filter(([key, value]) => {
      return key.startsWith('mobula-proxy-')
    })
    .map(([key, value]) => {
      return { [key.toString().replace('mobula-proxy-', '')]: value }
    })
  let headersObj = {}
  headersArray.forEach((entry) => {
    headersObj = { ...headersObj, ...entry }
  })
  return headersObj
}
// @access: public
exports.proxyController = async (req, res) => {
  //
  // EXTRACT ----------------------------------------
  //
  const applyQueries = (queries, url) => {
    let arr = []
    Object.entries(queries).forEach((el) => {
      if (el[0] !== 'mobulaproxyurl') {
        arr.push(`${el[0]}=${el[1]}`)
      }
    })
    const prefix = url.includes('?') ? '&' : '?'
    const output = arr.length === 0 ? url : `${url}${prefix}${arr.join('&')}`
    return output
  }
  // -------------------------------------------------------

  const decodedQueriesUrl = req.query.mobulaproxyurl
    .replace(/<>/g, '?')
    .replace(/></g, '&')
  const destinationUrl = applyQueries(req.query, decodedQueriesUrl)
  try {
    const axiosConfig = {
      url: destinationUrl,
      method: req.method,
      headers: getCustomHeaders(req.headers),
      params: req.params,
      data: req.body,
    }
    const proxyRequestStart = new Date().getTime()
    const response = await axios(axiosConfig)
    const proxyRequestEnd = new Date().getTime()
    const proxyResponse = {
      originalData: response.data,
      originalResponseHeaders: response.headers,
      proxyRequestHeaders: response.request._header,
      proxyTiming: proxyRequestEnd - proxyRequestStart,
    }
    res.status(response.status).send(proxyResponse)
  } catch (error) {
    res.status(error.response.status).send(error)
  }
}
