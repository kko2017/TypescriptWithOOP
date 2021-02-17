{
    type Animal = 'dog' | 'cat';
    type CapAnimal = Capitalize<Animal>; // 'Dog' | 'Cat'
}