const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const corsMiddleware = require("./middleware/corsMiddleware")
const userRoutes = require("./routes/userRoutes")
const proxyRoutes = require("./routes/proxyRoutes")
const requestRoutes = require("./routes/requestRoutes")
const workspaceRoutes = require("./routes/workspaceRoutes")
const collectionRoutes = require("./routes/collectionRoutes")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()
app.use("*", corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRoutes)
app.use("/api/proxy", proxyRoutes)
app.use("/api/request", requestRoutes)
app.use("/api/workspace", workspaceRoutes)
app.use("/api/collection", collectionRoutes)

app.use(express.static(path.join(__dirname, "/view")))
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "view", "index.html"))
)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
