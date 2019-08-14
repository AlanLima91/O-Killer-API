const express       = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(200).send('Server listening !')
})

app.listen(8000, () => {
    console.log('Listening on port 8000');
    
})

module.exports = {app}