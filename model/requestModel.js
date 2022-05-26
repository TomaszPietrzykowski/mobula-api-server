const mongoose = require("mongoose")

const requestSchema = mongoose.Schema(
  {
    reqName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reqMethod: {
      type: String,
      required: true,
    },
    reqUrl: {
      type: String,
      required: true,
    },
    reqHeaders: {
      type: Object,
      required: true,
      default: {},
    },
    reqQueries: {
      type: Object,
      required: true,
      default: {},
    },
    reqBody: {
      type: Object,
      required: false,
    },
    proxy: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestConfig: {
      type: Object,
      required: false,
    },
    lastResponse: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Request = mongoose.model("Request", requestSchema)

module.exports = Request
