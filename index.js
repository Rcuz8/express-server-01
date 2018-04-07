const express = require('express');
const app = express();


app.get('/', (request, res) => {
    res.send('Yo!!')
    }
)

app.get('/yeeters', (request, res) => {
    res.send('Yowowwow!!')
    }
)

app.listen(3000, () => console.log('Example app listening on post 3000!'))