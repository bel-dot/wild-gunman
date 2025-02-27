function isNumberInRange(num, start, end) {
    console.log(num, start, end);
    return start <= num && num <= end;
}

console.log(isNumberInRange(2, 1, 5));
console.log(isNumberInRange(2, 3, 5));

let a = true;
console.log("Before: ", a);
a = !a;
console.log("After: ", a);