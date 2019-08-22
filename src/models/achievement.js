const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Achievement = mongoose.model('Achievement', new Schema({
  from: String,
  for: String,
  message: String
}))

module.exports = Achievement
