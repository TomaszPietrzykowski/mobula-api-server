const mongoose = require("mongoose")

const workspaceSchema = mongoose.Schema(
    {
      users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
      },
      collections: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Collection"
      },
      requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Request"
      },
    },
    {
      timestamps: true,
    }
  )

  
const Workspace = mongoose.model("Workspace", workspaceSchema)

module.exports = Workspace