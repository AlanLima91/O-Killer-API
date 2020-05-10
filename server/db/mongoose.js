const mongoose = require('mongoose')

const connUri = process.env.MONGODB_URI

mongoose.promise = global.Promise

mongoose.connect(connUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB -- database connection established successfully!')
})

connection.on('error', (err) => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
  console.log('Tried to connect with ', connUri)
  process.exit()
})
module.exports = { mongoose }
