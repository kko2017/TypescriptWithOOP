// export default can be assigned to only one!!
export default function add(a, b) {
    return a + b;
}

// when using import * as ... from './module1.js', export default
// can not be imported to the other file.
// export function add(a, b) {
//     return a + b;
// }

// You want to export greater than one, then just export precedes the function.
export function print() {
    console.log('print...');
}

