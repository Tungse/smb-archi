const express = require('express')
const mongoose = require('mongoose')
const Achievement = require('./models/achievement')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const server = 'localhost:27017'
const database = 'tipps'
const mondoDB = `mongodb://${server}/${database}`
mongoose.connect(mondoDB, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', function () {
  console.error('error')
})

db.once('open', function () {
  console.info('connection succeded')
})

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(JSON.stringify(req))
})

app.post('/add', (req, res) => {
  new Achievement({
    user: req.body.user,
    name: req.body.name,
    text: req.body.text,
    class: req.body.class
  })
    .save((error) => {
      if (error) {
        console.error(error)
      }
    })

  res.end()
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
