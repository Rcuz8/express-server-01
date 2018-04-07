const express = require('express');
const app = express();


app.get('/', (request, res) => {
    res.send('Conneccteedd!!')
    }
)

app.get('/something', (request, res) => {
    res.send('somethingg!!')
    }
)

app.listen(3000, () => console.log('Example app listening on post 3000!'))