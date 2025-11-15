//Задание 1
function getSortedArray(array, key) {
  if (array.length <= 1) {
    return array;
  }
    
  const pivot = array[0];
  const left = [];
  const right = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i][key] < pivot[key]) {
      left.push(array[i]);
    } else {
     right.push(array[i]);
    }
  }

  return getSortedArray(left, key).concat([pivot], getSortedArray(right, key));
}
let array1 = [{name: 'Макар', age: 20}, {name: 'Роберт', age: 32}, {name: 'Екатерина', age: 50}, {name: 'Оксана', age: 24}, {name: 'Святослав', age: 43}];
let array2 = [{name: 'Макар', age: 20}, {name: 'Роберт', age: 32}, {name: 'Екатерина', age: 50}, {name: 'Оксана', age: 24}, {name: 'Святослав', age: 43}];

console.log(getSortedArray(array1,"name"));
console.log(getSortedArray(array2,"age"));

//Задание 2
function cesar(str, shift, action) {
    const alphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const alphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (alphabetLower.includes(char)) {
            const index = alphabetLower.indexOf(char);
            let newIndex;
            
            if (action === 'encode') {
                newIndex = (index + shift) > 32 ? (index + shift - 33) : (index + shift);
            } else if (action === 'decode') {
                newIndex = (index - shift) < 0 ? (index - shift + 33) : (index - shift);
            }
            
            result += alphabetLower[newIndex];
        }

        else if (alphabetUpper.includes(char)) {
            const index = alphabetUpper.indexOf(char);
            let newIndex;
            
            if (action === 'encode') {
                newIndex = (index + shift) > 32 ? (index + shift - 33) : (index + shift);
            } else if (action === 'decode') {
                newIndex = (index - shift) < 0 ? (index - shift + 33) : (index - shift);
            }
            
            result += alphabetUpper[newIndex];
        }

        else {
            result += char;
        }
    }
    
    return result;
}

const encodedMessage = "эзтыхз фзъзъз";
const decodedMessage = cesar(encodedMessage, 8, 'decode');
console.log(decodedMessage);


// Задание 3
function pow(x,n) {
    if(x < 1) return "Error";
    if(n === 1) return x;

    let result = x
    let i = 0
    while (i < n-1){
        i += 1;
        result *= x;
    }
    return result
}
console.log(pow(2,16))

// function generateHashtag (str) {
//   if(str === "") return false;
  
//   let newStr = str.replaceAll("#", "").split(" ");
//   newStr = newStr.filter((arg) => arg !== "");
  
//   for(let i = 0; i < newStr.length; i++){
//     newStr[i] = newStr[i][0].toUpperCase() + newStr[i].slice(1);
//   };
  
//   const result = newStr.join("")
//   if (result.length >= 140 || result === "") return false;
  
//   return `#${result}`;
// }

// console.log(generateHashtag("a".repeat(140)))