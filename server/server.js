require('dotenv').config();
const express       = require('express');
const bodyParser    = require('body-parser');
const { mongoose }  = require('./db/mongoose');

var app = express();

app.use(bodyParser.json());
const port  = process.env.PORT || 8000;
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
});

// app.get('*', function (req, res) {
//     console.log('middleWare')
//     res.status(401).send({ message: 'Unauthorized Access - No Token Provided!' })
// });

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log('Listening on port ' +  port);
})

module.exports = {app}