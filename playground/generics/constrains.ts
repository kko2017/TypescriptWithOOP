{
    interface Employee {
        pay(): void;

    }
    
    class FullTimeEmployee implements Employee {
        pay(): void {
            console.log(`Full time`);
        }
        workFullTime(): void {
            //...
        }
    }

    class PartTimeEmployee implements Employee {
        pay(): void {
            console.log(`Part time~~`);
        }
        workPartTime(): void {
            //...
        }
    }

    // constrain of generics
    function pay<T extends Employee>(employee: T) {
        employee.pay();
        return employee;
    } 

    const alex = new FullTimeEmployee();
    const ellie = new PartTimeEmployee();
    alex.workFullTime();
    ellie.workPartTime();

    const alexAfterPay = pay(alex);
    const ellieAfterPay = pay(ellie);
    alexAfterPay.workFullTime();
    ellieAfterPay.workPartTime();

    interface value {
        name: string;
        age?: number;
    }

    function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    const obj = {
        name: 'alex',
        age: 20
    }
    const obj2 = {
        name: '🐶'
    }

    console.log(getValue(obj, 'name')); // alex
    console.log(getValue(obj, 'age')); // 20
    console.log(getValue(obj2, 'name')); // 🐶

}