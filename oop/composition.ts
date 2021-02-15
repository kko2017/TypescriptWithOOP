{
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    interface MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup;
    }

    interface SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup;
    }

    class CheapMilkSteamer implements MilkFrother {
        private steamMilk(): boolean {
            console.log('steamming milk...🥛');
            return true;
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            const milk: boolean = this.steamMilk();
            return {
                ...cup,
                hasMilk: milk
            }
        }
    }

    class FancyMilkSteamer implements MilkFrother {
        private steamMilk(): boolean {
            console.log('Fancy steamming milk...🥛');
            return true;
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            const milk: boolean = this.steamMilk();
            return {
                ...cup,
                hasMilk: milk
            }
        }
    }

    class ColdMilkSteamer implements MilkFrother {
        private steamMilk(): boolean {
            console.log('still cold milk...🥛');
            return true;
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            const milk: boolean = this.steamMilk();
            return {
                ...cup,
                hasMilk: milk
            }
        }
    }

    class CandySugarMixer implements SugarProvider {
        private getSugar(): boolean {
            console.log('Getting some sugart from Candy 🍭');
            return true;
        }

        addSugar(cup: CoffeeCup): CoffeeCup {
            const sugar: boolean = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar
            };
        }
    }

    class SugarMixer implements SugarProvider {
        private getSugar(): boolean {
            console.log('Getting some sugart from jar 🧂');
            return true;
        }

        addSugar(cup: CoffeeCup): CoffeeCup {
            const sugar: boolean = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar
            };
        }
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
        
        constructor(
            beans: number,
            public readonly serialNumber: string,
            private milkFrother: MilkFrother
        ) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.milkFrother.makeMilk(coffee);
        }
    }

    class SweetCoffeeMachine extends CoffeeMachine {
        constructor(
            beans: number,
            public readonly serialNumber: string,
            private sugar: SugarProvider) {           
            super(beans);
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.sugar.addSugar(coffee);
        }
    }

    class SweetCaffeLatteMachine extends CoffeeMachine {
        constructor(
            beans: number,
            private milk: MilkFrother,
            private sugar: SugarProvider
        ) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            const sugarAdded = this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
        }

    }

    // Milk
    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer();
    // Sugar
    const candaySugar = new CandySugarMixer();
    const sugar = new SugarMixer();

    //
    const sweetCandyMachine = new SweetCoffeeMachine(21, 's23', candaySugar);
    const sweetMachine = new SweetCoffeeMachine(21, 's24', sugar);
    //
    const latteMachine = new CaffeLatteMachine(28, 'l31', cheapMilkMaker);
    const fancyLatteMachine = new CaffeLatteMachine(28, 'l32', fancyMilkMaker);
    const coldLatteMachine = new CaffeLatteMachine(28, 'l33', coldMilkMaker);


    const sweetLatteMachine = new SweetCaffeLatteMachine(35, cheapMilkMaker, candaySugar);
}