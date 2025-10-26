//  Задание 1
function fibb(n){
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0;
    let b = 1;

    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }

    return b;
};
console.log(fibb(755))

// Задание 2
function pluralizeRecords(n){
    let o = "";
    if(n === 1 || (n > 14 && n % 10 === 1)) {
        o = "запись";
    } else if( (n > 14 && [2,3,4].includes(n%10)) || (n < 9 && [2,3,4].includes(n)) ){
        o = "записи";
    } else {
        o = "записей";
    };
    return (`В результате выполнения запроса было найдено ${n} ${o}`);
}
for (let i = 0; i <= 100; i++) console.log(pluralizeRecords(i))

// Задание 3
function minDigit(x){
    const m = String(x);
    let minimum = 9;
    for (let i = 0; i < m.length; i++){
        if(Number(m[i]) < minimum) minimum = Number(m[i]);
    };
    return minimum;
};
console.log(minDigit(98989345969341))

// Задание 4
function gcd(a,b){
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
};
console.log(gcd(1048576,262140))


