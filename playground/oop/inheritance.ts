{
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;            
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    // access modifier protected: Child class can access it.
    class CoffeeMachine implements CoffeeMaker {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        // protected constructor(beans: number) {
        //     this.beans = beans;
        // }
        public constructor(beans: number) {
            this.beans = beans;
        }

        public static makeMachine(beans: number): CoffeeMachine {
            return new CoffeeMachine(beans);
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

        private extract(shots: number): CoffeeCup {
            console.log(`Pulling ${shots} shots...☕`);
            return {
                shots,
                hasMilk: false
            };
        }

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
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            this.steamMilk();
            return {
                ...coffee,
                hasMilk: true
            }
        }
    }

    const machine: CoffeeMachine = new CoffeeMachine(28);
    const latteMachine: CaffeLatteMachine = new CaffeLatteMachine(35, 'a23bke234po5');
    const latte = latteMachine.makeCoffee(2);
    console.log(latte);
    console.log(latteMachine.serialNumber);
}