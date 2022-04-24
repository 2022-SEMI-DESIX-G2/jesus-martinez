function getFibonacci(){

    number = document.getElementById("num").value;
    var fibo = [];
    fibo[0] = 0;
    fibo[1] = 1;
    for (var i = 2; i < number; i++) {
        fibo[i] = fibo[i - 2] + fibo[i - 1];
        console.log(fibo)
    }
    return fibo;
}

function createCard(number){

    const card = document.createElement('div')
    card.className = "card-num"
    
    const container = document.createElement('div')
    container.className = "container-num"
    
    const h5 = document.createElement('h5')
    h5.className = "numero"
    
}