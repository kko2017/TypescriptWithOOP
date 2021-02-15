/**
 * Let's make a calculator 🧮
 */
{
    type Op = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';

    function calculate(command: Op, first_num: number, second_num: number) {
        // if (command === 'add') {
        //     return first_num + second_num;
        // } else if (command === 'substract') {
        //     return first_num - second_num;
        // } else if (command === 'multiply') {
        //     return first_num * second_num;
        // } else if (command === 'divide') {
        //     return first_num / second_num;
        // } else if (command === 'remainder') {
        //     return first_num % second_num;
        // }

        switch (command) {
            case 'add':
                return first_num + second_num;
            case 'substract':
                return first_num - second_num;
            case 'multiply':
                return first_num * second_num;
            case 'divide':
                return first_num / second_num;
            case 'remainder':
                return first_num % second_num;
            default:
                throw Error('Unknown command');
        }
    }

    console.log(calculate('add', 1, 3)); // 4
    console.log(calculate('substract', 3, 1)); // 2
    console.log(calculate('multiply', 4, 2)); // 8
    console.log(calculate('divide', 4, 2)); // 2
    console.log(calculate('remainder', 5, 2)); // 1
}

