{
    type Check<T> = T extends string ? boolean : number;
    let num: Check<boolean> = 12;
    type Type = Check<string>;
    const bool: Type = true;

    type TypeName<T> = T extends string
        ? 'string'
        : T extends number
        ? 'number'
        : T extends boolean
        ? 'boolean'
        : T extends undefined
        ? 'undefined'
        : T extends Function
        ? 'function'
        : 'object';
    
    type T0 = TypeName<string>; // 'string'
    // const tmp: T0 = 'string';
    type T1 = TypeName<() => void>;
    // const tmp2: T1 = 'function';
    type T2 = TypeName<23>;
    // const tmp3: T2 = 'number';
}