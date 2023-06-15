// Factorial
function fac(i) {
    if (i <= 1) return 1;
    return i * fac(i - 1);
}

// formula A(N, K) = N!/K!*(N-K)!
function countIter(N, K) {
    return fac(N) / (fac(K) * fac(N - K))
}


// ShowIteration on N (N is Input.value)
function ShowIter() {
    let resultNum = document.getElementById('result_iter');
            
    try {
        let inputVal = document.getElementById('countBox').value;
        if (!Number(inputVal)) return resultNum.textContent = "is not Number";
        let CountIter = 0;

        for (let i = 0; i < inputVal; i++) {
            CountIter += countIter(inputVal, i);
        }
        resultNum.textContent = Math.trunc(CountIter);
    } catch (error) {
        resultNum.textContent = "someThing wrong";
    }
}
