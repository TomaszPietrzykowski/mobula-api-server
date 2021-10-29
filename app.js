const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(express.json())

app.use("/", (req, res) => {
  console.log(req.headers)
  res.setHeader("mobula-proxy-status", "running")
  res.status(200).json({ message: "Mobula proxy running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
