const mongoose = require('mongoose')

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'New folder',
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Request',
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection
