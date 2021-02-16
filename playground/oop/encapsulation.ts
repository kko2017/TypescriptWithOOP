{
    type CoffeCup = {
        shots: number;
        hasMilk: boolean;            
    }
    class CoffeeMachine {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        private constructor(beans: number) {
            this.beans = beans;
        }

        public static makeMachine(beans: number): CoffeeMachine {
            return new CoffeeMachine(beans);
        }

        public fillCoffeeBeans(beans: number): void {
            if (beans <= 0) {
                throw new Error('Value for beans should be greater than zero.');
            }

            this.beans += beans;
        }

        public makeCoffee(shots: number): CoffeCup {
            if (this.beans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
                throw new Error('Beans are not enough!!!');
            }
            this.beans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
            return {
                shots,
                hasMilk: false
            };
        }
    }

    // const maker1 = new CoffeeMachine(35);
    // const maker2 = new CoffeeMachine(28);
    // console.log(maker1);
    // console.log(maker2);
    const maker3 = CoffeeMachine.makeMachine(14);
    console.log(maker3);

    maker3.fillCoffeeBeans(20);
    console.log(maker3);

    class User  {
        private defaultAge: number = 25;

        constructor(private fName: string, private lName: string) {
        }

        get age(): number {
            return this.defaultAge;
        }

        set age(age: number) {
            if (age <= 0) {
                throw new Error('Value for age should be greater than zero.');
            }

            this.defaultAge = age;
        }

        get fullName(): string {
            return `${this.fName}  ${this.lName}`;
        }

        get firstName(): string {
            return this.fName;
        }

        set firstName(fName: string) {
            if (typeof fName !== 'string') {
                throw new Error('Value for first name should be string');
            }
            this.fName = fName;
        }

        get lastName(): string {
            return this.lName;
        }

        set lastName(lName: string) {
            if (typeof lName !== 'string') {
                throw new Error('Value for first name should be string');
            }
            this.lName = lName;
        }
    }

    let jobs = new User('Steve', 'Jobs');
    console.log(jobs.fullName);
    jobs.firstName = 'Alex';
    console.log(jobs.fullName);
    console.log(jobs.firstName);
    console.log(jobs.age);
    jobs.age = 20;
    console.log(jobs.age);

}