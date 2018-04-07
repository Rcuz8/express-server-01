const express = require('express');
const app = express();

// Let Heroku decide port
var port = process.env.PORT || 8080;

app.get('/', (request, res) => {
    res.send('Conneccteedd!!')
    }
)

app.get('/something', (request, res) => {
    res.send('somethingg!!')
    }
)

app.listen(port, () => console.log('Example app listening on post 3000!'))