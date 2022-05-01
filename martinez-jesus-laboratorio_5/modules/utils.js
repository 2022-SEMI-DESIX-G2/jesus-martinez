(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                var fibo = [];
                fibo[0] = 0;
                fibo[1] = 1;
                for (var i = 2; i < n; i++) {
                    fibo[i] = fibo[i - 2] + fibo[i - 1];
                }
                return fibo;
            }
        }
    }
    document.Utils = Utils
})()