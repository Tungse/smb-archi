const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Achievement = mongoose.model('Achievement', new Schema({
  user: String,
  name: String,
  text: String,
  class: String
}))

module.exports = Achievement
