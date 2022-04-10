function palindromo(n) {
    num = n.toString()
    binario = n.toString(2)

    var decimalRev = num.split("").reverse().join("")
    var BinarioRev = binario.split("").reverse().join("")

    if (num == decimalRev && binario == BinarioRev){
        console.log("El numero es palíndromo de doble base")
    }else {
        console.log("El numero NO es palíndromo de doble base")
    }
}

function countWords(w) {
    var cont = {}
    console.log(w.length)
    for (var i in w) {
        cont[w[i]] = (cont[w[i]] || 0 ) + 1
    }
    return cont
}

function bisiestoYear(year) {
    var y = parseInt(year)
    if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
        console.log("El Año es bisiesto")
    }else {
        console.log("El Año No es bisiesto")
    } 
}

function addPrimos(n){
    var num = parseInt(n)
    for (var i = 2; i < num ; i++ ){
        if ( num % i == 0){
            return false
        }
    }
    return true
}

function contPrimos(num){
    n = parseInt(num)
    sum = 0
    for (var i = 0; i <= n; i++){
        if (addPrimos(i)){
            sum = sum+i
        }
    }
    console.log("La suma de los numero es ",sum)
}

let numero = 585
let word = "jeesu 63032966"
let year = 2000
let num = 7

console.log("----- Parte 1 ------")
console.log(palindromo(numero))
console.log("----- Parte 2 ------")
console.log(countWords(word))
console.log("----- Parte 3 ------")
console.log(bisiestoYear(year))
console.log("----- Parte 4 ------")
console.log(contPrimos(num))
