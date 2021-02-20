import { $ } from './utils/utility.js';
import { PageComponent } from './components/page.js';
class app {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
}
new app($(".document"));
