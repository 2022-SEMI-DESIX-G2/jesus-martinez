function palindromo() {

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
    for (var i = 0; i < num ; i++ ){
        if ( i / 2 == 0){
            console.log(i)
        }
    }
}

let word = "jeesu 63032966"
let year = 2000
let num = 7

console.log(countWords(word))
console.log(bisiestoYear(year))
console.log(addPrimos(num))