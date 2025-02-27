function returnMaxAndMin(arr) {
    let max = undefined, min = undefined;
    for(let i = 0; i < arr.length; i++) {
        if(!max || arr[i] > max) max = arr[i];
        if(!min || arr[i] < min) min = arr[i];
    }

    return [max, min];
}

console.log(returnMaxAndMin([1, 2, 3, 4, 5]));

function compareObjects(obj1, obj2) {
    if(obj1.a === obj2.a && obj1.b === obj2.b) {
        return true;
    }
    else return false;
}

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { a: 5, b: 2 };

console.log(compareObjects(obj1, obj2));
console.log(compareObjects(obj1, obj3));