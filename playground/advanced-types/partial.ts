{
    type ToDo = {
        title: string;
        description: string;
        label: string;
        prority: 'high' | 'low';
    };

    function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
        // todo = { ...todo, ...fieldsToUpdate };

        for (const key in fieldsToUpdate) {
            todo[key] = fieldsToUpdate[key];
        }
        
        console.log(todo);
        return todo;
    }

    const todo: ToDo = {
        title: 'TypScript101',
        description: 'Study hard',
        label: 'ts',
        prority: 'low'
    };
    console.log(todo);
    const updated = updateTodo(todo, { prority: 'high' });
    console.log('----------------');
    console.log(updated);
    console.log('----------------');
    console.log(todo);

    // function test(obj: any): void {
    //     obj['a'] = 5;
    // }

    // let obj = {
    //     a: 10
    // };
    // console.log(obj.a);
    // test(obj);
    // console.log(obj.a);

    // let obj3 = {
    //     a: 20
    // };
    // obj = {
    //     ...obj,
    //     ...obj3
    // };
    // console.log(obj.a);
}