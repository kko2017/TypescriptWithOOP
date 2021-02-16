{
    type ToDo = {
        title: string;
        description: string;
    };

    // Error due to Readonly. Go to definition of Readonly. You can see how does Readonly works.
    function display(todo: Readonly<ToDo>) {
        todo.title = 'jaja';
    }
}