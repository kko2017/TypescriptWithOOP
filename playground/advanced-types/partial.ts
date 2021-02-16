{
    type ToDo = {
        title: string;
        description: string;
        label: string;
        prority: 'high' | 'low';
    };

    function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
        todo = { ...todo, ...fieldsToUpdate };
        console.log(todo);
        return todo;
    }

    const todo: ToDo = {
        title: 'TypScript101',
        description: 'Study hard',
        label: 'ts',
        prority: 'low'
    };

    const updated = updateTodo(todo, { prority: 'high' });
    console.log('----------------');
    console.log(updated);
    console.log('----------------');
    console.log(todo);
}