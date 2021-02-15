{
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    // access modifier protected: Child class can access it.
    abstract class CoffeeMachine implements CoffeeMaker {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        // protected constructor(beans: number) {
        //     this.beans = beans;
        // }
        public constructor(beans: number) {
            this.beans = beans;
        }

        public clean() {
            console.log('Cleaning....🛁');
        }

        public fillCoffeeBeans(beans: number): void {
            if (beans <= 0) {
                throw new Error('Value for beans should be greater than zero.');
            }

            this.beans += beans;
            console.log(`Filling up beans...now we have ${this.beans} beans.`);
        }


        private grindBeans(shots: number): void {
            if (this.beans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
                throw new Error('Beans are not enough!!!');
            }
            console.log(`Grinding beans for ${shots} shots...`);
            this.beans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
        }

        private preHeat(): void {
            console.log('Heating up...🔥🔥');
        }

        protected abstract extract(shots: number): CoffeeCup; 

        public makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots);
            this.preHeat();
            return this.extract(shots);
        }
    }

    class CaffeLatteMachine extends CoffeeMachine {
        
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans);
        }

        private steamMilk() {
            console.log('steamming milk...🥛');
        }

        protected extract(shots: number): CoffeeCup {
            this.steamMilk();
            return {
                shots,
                hasMilk: true
            };
        } 
        
    }

    class SweeCoffeeMAchine extends CoffeeMachine {
        constructor(beans: number, public readonly serialNumber: string) {           
            super(beans);
        }

        private addSugar() {
            console.log('Adding sugar....🍭');
        }
        protected extract(shots: number): CoffeeCup{
            this.addSugar();
            return {
                shots,
                hasSugar: true
            };
        }; 
    }
    // const machines: CoffeeMachine[] = [
    const machines: CoffeeMaker[] = [
        new CaffeLatteMachine(35, 'abc234'),
        new SweeCoffeeMAchine(21, 'kiss2034'),
        new CaffeLatteMachine(35, 'abc235'),
        new SweeCoffeeMAchine(21, 'kiss2035'),
    ];

    machines.forEach(machine => {
        machine.makeCoffee(2);
        // machine.fillCoffeeBeans(20);
        console.log('-----------------------');
    });
}