export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
    protected readonly element: T;
    constructor(htmlString?: string) {
        const template = document.createElement('template');
        if (htmlString) {
             template.innerHTML = htmlString;   
        }
        this.element = template.content.firstElementChild! as T;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin' ): void {
        parent.insertAdjacentElement(position, this.element);
    }
}