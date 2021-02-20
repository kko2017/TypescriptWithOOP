import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';

import { $ } from './utils/utility.js';
class app {
    private readonly page: PageComponent;
    private readonly image: ImageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent('https://picsum.photos/600/300', 'My first image');
        this.image.attachTo(appRoot, 'beforeend');
    }
}

new app($<HTMLElement>('.document'));