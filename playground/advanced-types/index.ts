{
    type Animal = {
        name: string;
        age: number;
        gender: 'male' | 'female';
    };

    type Name = Animal['name'];     // string
    const name: Name = 'hello';

    type Gender = Animal['gender']; // 'male' | 'female'
    const gender: Gender = 'male';

    // Get all keys of properties in a Type
    type Keys = keyof Animal;       // 'name' | 'age' | 'gender'
    const key: Keys = 'name';

    type Person = {
        name: string;
        gender: Animal['gender'];
    };
    const person: Person = {
        name: 'alex',
        gender: 'male'
    };


}