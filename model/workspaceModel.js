const mongoose = require('mongoose')

const workspaceSchema = mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      default: 'New workspace',
    },
    collections: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Collection',
      required: true,
      default: [],
    },
    requests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Request',
      required: true,
      default: [],
    },
    openRequests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Request',
      required: true,
      default: [],
    },
    selectedRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
      required: false,
    },
    environment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Environment',
      required: false,
    },
    environments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Env',
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Workspace = mongoose.model('Workspace', workspaceSchema)

module.exports = Workspace
