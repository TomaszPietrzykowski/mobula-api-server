module.exports = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  })

  // intercept OPTIONS method
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
}
