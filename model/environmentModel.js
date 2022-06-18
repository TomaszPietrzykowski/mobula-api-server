const mongoose = require('mongoose')

const envVariableSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

const environmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Unnamed Environment',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  variables: [envVariableSchema],
})

const Env = mongoose.model('Environment', environmentSchema)

module.exports = Env
