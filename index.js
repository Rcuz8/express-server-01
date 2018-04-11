const express = require('express');
const app = express();
var axios = require('axios');
const https = require('https');
const numeric = require('numeric');

// Let Heroku decide port
var port = process.env.PORT || 8080;

var BASE_URL = "https://api.binance.com";
var PRICE_URL = "https://api.binance.com/api/v3/ticker/price";

// Requests

app.get('/', (request, res) => {
    res.send('Conneccteedd!!')
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

app.get('/tradeInfo', (req, res) => {
    // input info
    let to = req.query.tradingTo;
    let from = req.query.tradingFrom;
    
    // get last 100 days of data
    var dates = [];
    for (var i = 0; i < 100; i++) {
      var tempDay =  new Date();
      tempDay.setDate(new Date().getDate() - i);
      dates[i] = tempDay.toISOString();
    }

    for (var i = 0; i < 100; i++) {
        // New Request info
        var thisPath = "rest.coinapi.io/v1/exchangerate/"+to+"/"+from+'?time='+dates[i];
        
        axios.get(PRICE_URL, {
            params: {
                "headers": {'X-CoinAPI-Key': 'EDE697F5-1FEF-468A-B3E6-FAD8DE8E7976'}
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
     /*   
        
        console.log("Looping through path: " + thisPath);
        var options = {
          "method": "GET",
          "hostname": "rest.coinapi.io",
          "path": thisPath,
          "headers": {'X-CoinAPI-Key': 'EDE697F5-1FEF-468A-B3E6-FAD8DE8E7976'}
        };

        // Make HTTP request
        var request = https.request(options, function (resp, err) {
//          response.on("data", function (data) {
//            console.log(data);
//          });
            console.log("Ding");
        })
        
        */
        
    }
    
    
    
      
request.end();
    
})



app.get('/matrix-ops', (req, res) => {
    
    init();
    
})

    function getRes(xList, yList, p) {
       var arr=[];
       var N = xList.length;
       for(var i = p; i >= 0; i--) {
            say("looping");
           var tempSum = 0;
           for(var el = 0; el < N; el++) {
               let temp = Math.pow(xList[el], i) * yList[el];
               say("doing " + xList[el] + "^" + i + " x " + yList[el]);
               tempSum+=temp;
           }
           arr.push([tempSum]);
       }
       say(arr);
       return arr;
    }

    function bigMatrix(xList, yList, p) {
       var matrix=[];
       var N = xList.length;
       for( var i = 2*p; i >= p; i-- ) {
           
           var smallArray = [];
           var min = i - p;
           for( var c = i; c >= min; c-- ) {
               say("on row " + i + " in column " + c + " with min value " + min);
               var tempSum = 0;
               for(var slot = 0; slot < N; slot++) {
                   let x = Math.pow(xList[slot], c); // maybe c
                   
                   say("doing " + xList[slot] + "^" + c); //maybe c
                   tempSum+=x;
               }

               smallArray.push(tempSum); 
               say("pushing" + tempSum);
           }
           matrix.push(smallArray);
        }
         say(matrix);  
         
         return matrix;
    } 
    
// inverse matrix: numeric.inv(matrix)
// multiply matrix: numeric.dot(matrix1, matrix2)
    
// Returns the inverse of matrix `M`.
function matrix_invert(M){
    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    
    //if the matrix isn't square: exit (error)
    if(M.length !== M[0].length){return;}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }
    
    // Perform elementary row operations
    for(i=0; i<dim; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<dim; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<dim; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}

function init() {
    var xList = [1,2,3,4,5];
    var yList = [1,2,4,2,2];
    var p = 2; // number of X's you want
    let res = getRes(xList, yList, p);
    let matrix = bigMatrix(xList, yList, p);
  //  console.log("gooood");
    let invBigMatrix = matrix_invert(matrix);//numeric.inv(matrix);
  //  console.log("invBig.. " + invBigMatrix);
    let ansMatrix = multiply(invBigMatrix, res);  //numeric.dot(invBigMatrix, res);
  //  say(ansMatrix);
    console.log(ansMatrix);
}
  
// MATRICES THAT PASSED TEST: (1)
// [[1,2,3], [1,5,6]] -> P = 1
//

// Helpers Below 
function say(str) {
   // document.write(str);
    console.log(str)
 //   br();
}
function br() {
   // document.write("<br>");
}

function multiply(a, b) {
    console.log("in mult function: ");
    console.log(a);
    console.log(b);
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}




app.listen(port, () => console.log('Cuzzo Server listening on port '+ port + '!'))