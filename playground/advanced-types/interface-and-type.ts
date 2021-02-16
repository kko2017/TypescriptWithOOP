{
    // similarity between Interface and Type
    type PositionType = {
        x: number;
        y: number;
    }

    interface PositionInterface {
        x: number;
        y: number;
    }

    // object
    const obj1: PositionType = {
        x: 1,
        y: 1
    };

    const obj2: PositionInterface = {
        x: 1,
        y: 1
    }

    // function
    function getPosition1(): PositionInterface {
        return {
            x: 1,
            y: 1
        }
    };

    function getPosition2(): PositionType {
        return {
            x: 1,
            y: 1
        }
    }

    // class
    class Pos1 implements PositionInterface {
        x: 1;
        y: 1;
    }

    class Pos2 implements PositionType {
        x: 1;
        y: 1;
    }

    // extends Interface and Type
    interface ZPositionInterface extends PositionInterface {
        z: 1;
    }

    type ZPositionType = PositionType & { z: 1 };

    /**********************************************************************/
    
    // Only same indentifier Interfaces can be merged each other
    interface test1 {
        x: 1;
        y: 1;
    }

    interface test1 {
        z: 1;
    }

    const t: test1 = {
        x: 1,
        y: 1,
        z: 1
    };

    /***********************************************************************/
    // Unique functions of Type
    // Type can use Union with specific variables
    type Definition = 'left' | 'right';

    // premitive data or object can be renamed as alias
    type NumberType = number;

    // computed properties can be used by Type
    type Person = {
        name: string;
        age: number;
    }

    // Type of name is string that I can know by inference of TypeScript
    type Name = Person['name'];     
}