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

    class NoMilk implements MilkFrother {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            return cup;
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

    class NoSugar implements SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup {
            return cup;
        }
    }

    // access modifier protected: Child class can access it.
    class CoffeeMachine implements CoffeeMaker {
        private beans: number = 0;
        private static readonly BEANS_GRAM_PER_SHOT = 7;
        
        public constructor(
            beans: number,
            private milk: MilkFrother,
            private sugar: SugarProvider
        ) {
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
            const coffee = this.extract(shots);
            const sugarAdded = this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
        }
    }

    // Milk
    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer();
    const noMilk = new NoMilk();
    // Sugar
    const candaySugar = new CandySugarMixer();
    const sugar = new SugarMixer();
    const noSugar = new NoSugar();

    //
    const sweetCandyMachine = new CoffeeMachine(21, noMilk, candaySugar);
    const sweetMachine = new CoffeeMachine(21, noMilk, sugar);
    //
    const latteMachine = new CoffeeMachine(28, cheapMilkMaker, noSugar);
    const fancyLatteMachine = new CoffeeMachine(28, fancyMilkMaker, noSugar);
    const coldLatteMachine = new CoffeeMachine(28, coldMilkMaker, noSugar);


    const sweetLatteMachine = new CoffeeMachine(35, cheapMilkMaker, candaySugar);
}