const express       = require('express');
const bodyParser    = require('body-parser');
const { mongoose }  = require('./db/mongoose');

var app = express();

app.use(bodyParser.json());

require('./controllers/controllersLoader')(app);

app.get('/', (req, res) => {
    res.status(200).send('Server listening !')
})

app.use(express.static(__dirname + '/public'));

app.listen(8000, () => {
    console.log('Listening on port 8000');
})

module.exports = {app}