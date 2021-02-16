{    
    type Nullable<T> = {
        [K in keyof T]: T[K] | null;
    };

    type Optional<T> = {
        [K in keyof T]?: T[K];
    };

    type ReadOnly<T> = {
        readonly [K in keyof T]: T[K];
    };

    // Example
    type Video = {
        title: string;
        author: string;
    }
    
    const nullableVideo: Nullable<Video> = {
        title: null,
        author: null
    };

    // Even no properties, it is OK due to optional types.
    const optionalVideo: Optional<Video> = {
        
    };

    const readonlyVideo: ReadOnly<Video> = {
        title: 'R',
        author: 'Jane'
    };

    // Error!!! Because it readonly!!
    // readonlyVideo = {
    //     title: 'S',
    //     author: 'Blue'
    // };

    
    // According to the example of TypeScript Handbook about mapped-type, You can create proxify type.
    type Proxy<T> = {
        get(): T;
        set(value: T): void;
    };

    type Proxify<T> = {
        [K in keyof T]: Proxy<T[K]>;
    };

    function proxify<T>(t: T): Proxify<T> {
        let result = <Proxify<T>>{};
        for (const k in t) { // k is of type Extract<keyof T, string> so it must be a key of T
            // result[k] and t[k] both work because k is a key of both T and Proxify<T> but result['random'] would be invalid
            result[k] = { // get/set fields are checked, so _get would be an error
                // the return of get must be T[Extract<keyof T, string>] so ()=> 0 would be an error
                get: () => t[k],
                // value and t[k] must be T[Extract<keyof T, string>] so t[k] = '' would also be an error
                set: (value) => t[k] = value
            }           
        }
        return result;
    };

    // let props = { rooms: 4 };
    // let proxyProps = proxify(props);

    // proxyProps.rooms.set(10);
    // console.log(proxyProps.rooms.get());
    let newVideo: Video = {
        title: 'Wonderful Days',
        author: 'Jane'
    };
    let proxyProps = proxify(newVideo);
    console.log(proxyProps.author.get());
    console.log(proxyProps.title.get());
}