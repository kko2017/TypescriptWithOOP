{
    type CoffeCup = {
        shots: number;
        hasMilk: boolean;            
    }
    class CoffeeMachine {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        constructor(beans: number) {
            this.beans = beans;
        }

        static makeMachine(beans: number): CoffeeMachine {
            return new CoffeeMachine(beans);
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

    const maker1 = new CoffeeMachine(35);
    const maker2 = new CoffeeMachine(28);
    console.log(maker1);
    console.log(maker2);
    const maker3 = CoffeeMachine.makeMachine(14);
    console.log(maker3);
}