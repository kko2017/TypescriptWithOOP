import { $ } from './utils/utility.js';
import { PageComponent } from './components/page.js';
class app {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
}

new app($(".document"));