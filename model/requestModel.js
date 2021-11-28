const mongoose = require("mongoose")

const requestSchema = mongoose.Schema(
    {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      requestConfig: {
          type: Object,
          required: true
      },
      lastResponse: {
          type: Object,
          required: false
      }
    },
    {
      timestamps: true,
    }
  )
  
  
const Request = mongoose.model("Request", requestSchema)

module.exports = Request