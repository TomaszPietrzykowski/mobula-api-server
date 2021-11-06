module.exports = (req, res, next) => {
  console.log("cors triggered")

  res.setHeader("Access-Control-Expose-Headers", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, HEAD, OPTIONS"
  )
  // intercept OPTIONS method
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
}
