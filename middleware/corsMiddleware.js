exports.cors = (req, res) => {
  console.log(req.headers)
  res.setHeader("mobula-proxy-status", "running")
  res.status(200).json({ message: "Mobula proxy running" })
}
