{
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;            
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    interface CommercialCoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
        fillCoffeeBeans(beans: number): void;
        clean();
    }

    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        private constructor(beans: number) {
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

    // const maker3: CoffeeMachine = CoffeeMachine.makeMachine(14);
    // console.log(maker3);
    // maker3.fillCoffeeBeans(20);
    // console.log(maker3);

    // implement object by CoffeeMaker interface
    // const maker4: CoffeeMaker = CoffeeMachine.makeMachine(21);
    // maker4.fillCoffeeBean(30);

    // implement object by CommercialCoffeeMaker interface
    // const maker5: CommercialCoffeeMaker = CoffeeMachine.makeMachine(28);
    // maker5.fillCoffeeBeans(50);
    // maker5.clean();

    class AmateurUser {
        constructor(private machine: CoffeeMaker) { }
        makeCoffee(ea: number) {
            const coffee = this.machine.makeCoffee(ea);
            console.log(coffee);
        }
    }

    class ProBarista {
        constructor(private machine: CommercialCoffeeMaker) { }
        makeCoffee(ea: number) {
            const coffee = this.machine.makeCoffee(ea);
            console.log(coffee);
            this.machine.clean();
            this.machine.fillCoffeeBeans(20);
        }
    }

    const maker: CoffeeMachine = CoffeeMachine.makeMachine(28);
    const ama = new AmateurUser(maker);
    ama.makeCoffee(2);
    console.log('////////');
    const pro = new ProBarista(maker);
    pro.makeCoffee(2);
}