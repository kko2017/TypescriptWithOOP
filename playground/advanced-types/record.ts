{
    type Page = 'home' | 'about' | 'contact';
    type PageInfo = {
        title: string;
    };

    // Record<K extends keyof any, T> = {
    //    [P in K] = T;     
    // }
    const nav: Record<Page, PageInfo> = {
        home: { title: 'Home' },
        about: { title: 'About' },
        contact: { title: 'Contact' }
    };
}