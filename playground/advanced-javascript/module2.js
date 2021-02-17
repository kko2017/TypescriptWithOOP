// export default is just imported by calling its name
// export must be imported using destructuring assignment
import add, { print } from './module1.js';

console.log(add(2, 5));
print();

/************************************/
// import add, { print as printMessage } from './module1.js';

// console.log(add(2, 5));
// printMessage();

/************************************/
// import * as calculator from './module1.js';

// console.log(calculator.add(2, 5));
// calculator.print();