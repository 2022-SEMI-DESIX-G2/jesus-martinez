const express = require('express')
const app = express()

function getFibonacci(number){

    var fibo = [];
    fibo[0] = 0;
    fibo[1] = 1;
    for (var i = 2; i < number; i++) {
        fibo[i] = fibo[i - 2] + fibo[i - 1];
    }
    return fibo;
}

app.get('/fibanocci/:number', (req, res) => {
    const { number } = req.params
    const  fibo = getFibonacci(number)
    res.json({ sequence : fibo })
  })

app.listen(3000)