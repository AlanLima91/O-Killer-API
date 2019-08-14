const mongoose = require('mongoose');

const password = encodeURIComponent('testtest6')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:'+password+'@ds263127.mlab.com:63127/heroku_1qqv03zk', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true)

module.exports = {mongoose};