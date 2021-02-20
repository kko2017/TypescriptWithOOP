import { $ } from '../utils/utility.js';
export class PageComponent {
    constructor() {
        this.element = $('ul');
        this.element.setAttribute('class', 'page');
        this.element.textContent = 'This is a PageComponent';
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}
