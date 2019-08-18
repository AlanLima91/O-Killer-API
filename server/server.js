const express       = require('express');
const bodyParser    = require('body-parser');
const { mongoose }  = require('./db/mongoose');

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'X-Auth');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  })

require('./controllers/controllersLoader')(app);

app.get('/', (req, res) => {
    res.status(200).send('Server listening !')
})

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on port ' + process.env.PORT || 8000);
})

module.exports = {app}