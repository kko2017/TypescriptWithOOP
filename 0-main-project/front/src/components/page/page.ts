import { $ } from '../../utils/utility.js';

export class PageComponent {
    private element: HTMLUListElement;
    constructor() {
        this.element = $<HTMLUListElement>('ul');
        this.element.setAttribute('class', 'page');
        this.element.textContent = 'This is a PageComponent';
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ): void {
        parent.insertAdjacentElement(position, this.element);
    }
}