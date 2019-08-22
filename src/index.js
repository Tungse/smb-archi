const express = require('express')
const mongoose = require('mongoose')
const Achievement = require('./models/achievement')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const cron = require('node-cron')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const server = 'smb-archi-shard-00-00-gaxqw.mongodb.net:27017'
const database = 'achievements'
const mondoDB = `mongodb://archi:go@${server}/${database}`
mongoose.connect(mondoDB, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', function () {
  console.error('error')
})

db.once('open', function () {
  console.info('connection succeded')
})

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Hello world')
  res.end()
})

app.post('/', (req, res) => {
  console.log(req.body)

  let name = req.body.text.substr(0, req.body.text.indexOf(' '))
  let message = req.body.text.substr(req.body.text.indexOf(' ') + 1)

  if (message === 'list') {
    Achievement.find({ 'for': '@' + req.body.user_name }).exec().then((achievements) => {
      let attachments = []

      achievements.map((achievement, i) => {
        attachments.push({
          'text': `${achievement.message} by <@${achievement.from}>`
        })
      })

      fetch(req.body.response_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
          'text': `Great! You are awarded ${achievements.length} times:`,
          'attachments': attachments
        })
      })
      res.end()
    })

    return
  }

  new Achievement({
    from: req.body.user_name,
    for: name,
    message: message
  })
    .save((error) => {
      if (error) {
        console.error(error)
      }

      fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
          'text': `Hey there is a new achievement incomming ...`,
          'attachments': [
            { 'text': `<${name}> gets awarded by <@${req.body.user_name}> for ${message}` }
          ]
        }).then((data) => {
          console.log(data)
        })
      })
    })

  res.end()
})

cron.schedule('* * * 31 * *', () => {
  console.log('running a task every minute')

  fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      'text': `Hey there are new achievements incomming ...`,
      'attachments': [
        {
          'text': `<@stefanbubeck> gets awarded for being the *Editor of the Month* with > 10.000.000 PI`,
          'thumb_url': `https://static.giga.de/wp-content/uploads/2019/07/giga-stefan-bubeck-q_giga-P1299590-rcm992x0.jpg`
        },
        {
          'text': `<@florianmoeser> gets awarded for being the *SweeperBot of the Month* with 30 deleted Branches`,
          'thumb_url': `https://i.etsystatic.com/14802003/r/il/a3b6b0/1695215682/il_794xN.1695215682_6u7o.jpg`
        },
        {
          'text': `<@daviddieckmann> gets awarded for being the *Topseller of the Month* with >30.0000 € revenue`,
          'thumb_url': `https://gedankenwelt.de/wp-content/uploads/2018/08/mann-mit-geld-e1535723949487.jpg`
        }
      ]
    })
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!!')
})
