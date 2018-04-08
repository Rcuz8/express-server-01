const express = require('express');
const app = express();
var axios = require('axios');

// Let Heroku decide port
var port = process.env.PORT || 8080;

var BASE_URL = "https://api.binance.com";
var PRICE_URL = "https://api.binance.com/api/v3/ticker/price";

app.get('/', (request, res) => {
    res.send('Conneccteedd!!')
    }
)

app.get('/something', (request, res) => {
    res.send('somethingg!!')
    }
)

app.get('/binance-info', (req, res) => {
        
        let _symbol = req.query.symbol
        console.log();
        console.log("Creating Binance Info Request...");
        console.log("EXCHANGE SYMBOL: " + _symbol);
        axios.get(PRICE_URL, {
            params: {
                symbol: _symbol
            }
        }
   )
  .then(function (response) {
    console.log("Sending over data: " + response.data.price);
        
    res.send(response.data.price);
  })
  .catch(function (error) {
    console.log(error);
    res.send("COULD NOT FIND!!");
  });
    }       
)

app.listen(port, () => console.log('Cuzzo Server listening on port '+ port + '!'))