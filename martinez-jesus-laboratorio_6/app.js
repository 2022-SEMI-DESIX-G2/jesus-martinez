// const str = "oso"
// const isPalindrome = (s) => s === s.split("").reverse().join("")
// console.log(isPalindrome(str))

// Fibonacci

function getFibonacci(number){

    var fibo = [];
    fibo[0] = 0;
    fibo[1] = 1;
    for (var i = 2; i < number; i++) {
        fibo[i] = fibo[i - 2] + fibo[i - 1];
    }
    return fibo;
}

console.log(getFibonacci(5))