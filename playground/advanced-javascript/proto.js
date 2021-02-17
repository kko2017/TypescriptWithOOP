{
    const a = {};
    const b = {};
    console.log(a);
    console.log(b);
    console.log(a.__proto__ === b.__proto__);

    const array = [];
    console.log(array);
    console.log(array.__proto__.__proto__ === a.__proto__);

    console.clear();

    function CoffeeMachine(shots) {
        this.shots = shots;
        // Instance member level
        // this.makeCoffee = () => {
        //     console.log('Coffee...');
        // };
    }
    // Prototype member level
    CoffeeMachine.prototype.makeCoffee = () => { console.log('Coffee...'); };
    CoffeeMachine.prototype.beans = 25;

    const machine1 = new CoffeeMachine(2);
    const machine2 = new CoffeeMachine(5);
    console.log(machine1);
    console.log(machine2);
    machine1.makeCoffee();
    
    // console.clear();

    function LatteMachine(milk) {
        this.milk = milk
    }
    LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

    const latteMachine = new LatteMachine(123);
    console.log(latteMachine);
    latteMachine.makeCoffee();
    console.log(latteMachine.beans);
}