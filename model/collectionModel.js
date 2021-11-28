const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema(
    {
      workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
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

  
const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection