require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
const path = require('path')

var app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Expose-Headers', 'X-Auth')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

require('./controllers/controllersLoader')(app)

app.get('/', (req, res) => {
  res.status(200).send('Server listening !')
})

// app.get('*', function (req, res) {
//     res.status(401).send({ message: 'Unauthorized Access - No Token Provided!' })
// })

app.use(express.static(path.join(__dirname, '/public')))

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = { app }
