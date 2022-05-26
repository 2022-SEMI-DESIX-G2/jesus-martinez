var express = require('express')
var app = express()

function getFibonacci(number){
    var fibo = []
    fibo[0] = 0
    fibo[1] = 1
    for (var i = 2; i < number; i++) {
        fibo[i] = fibo[i - 2] + fibo[i - 1]
    }
    return fibo
}

app.get('/fibanocci/:num', function (req, res) {
    const  { num } = req.params
    console.log(getFibonacci(num))
    res.json({ 'el numero es': num })
  })
  
app.listen(3000)
