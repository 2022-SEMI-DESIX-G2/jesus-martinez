const table = document.getElementsByClassName('table')[0]


function getFibonacci(number){

    var fibo = [];
    fibo[0] = 0;
    fibo[1] = 1;
    for (var i = 2; i < number; i++) {
        fibo[i] = fibo[i - 2] + fibo[i - 1];
    }
    return fibo;
}

function createCard(number){

    const card = document.createElement('div')
    card.className = "card-num"
    
    const cerrar = document.createElement('div')
    cerrar.className = "x"
    cerrar.type = "button"
    cerrar.innerText = "x"

    const container = document.createElement('div')
    container.className = "container-num"
    
    const h5 = document.createElement('h5')
    h5.className = "numero"
    h5.innerText = number
    
    card.append(cerrar)
    card.append(container)
    container.append(h5)

    cerrar.addEventListener("click", (event) => {
        event.target.parentNode.remove()
    })

    return card
}

function calcular(){

    number = document.getElementById("num").value;
    fiboNumber = getFibonacci(number)
    
    for(let i = 0; i < number; i++){
        fibo = fiboNumber[i]
        table.appendChild((createCard(fibo)))
    }

}
