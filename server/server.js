const express       = require('express');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Server listening !')
})

app.use(express.static(__dirname + '/public'));

app.listen(8000, () => {
    console.log('Listening on port 8000');
})

module.exports = {app}