const mongoose = require('mongoose');

const password = encodeURIComponent('')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://:'+password+'@:?authSource=admin');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};