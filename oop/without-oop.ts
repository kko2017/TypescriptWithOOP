{
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };
    const BEANS_GRAM_PER_SHOT = 7;
    let beans: number = 0;

    function makeCoffie(shots: number): CoffeeCup  {
        if (beans < BEANS_GRAM_PER_SHOT * shots) {
            throw new Error('Beans are not enough!!');
        }        
        beans -= BEANS_GRAM_PER_SHOT * shots;

        return {
            shots,
            hasMilk: false
        };
    }

    beans = BEANS_GRAM_PER_SHOT * 5;
    const myCup = makeCoffie(2);
    console.log(myCup);
}