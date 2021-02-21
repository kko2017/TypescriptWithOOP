import { BaseComponent, Component } from './../component.js';

export interface Composable {
    addChild(component: Component): void;
} 

type OnCloseListener = () => void;
class PageItemComponent extends BaseComponent<HTMLElement>{
    private closeListener?: OnCloseListener;
    constructor() {
        super(`<li class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close">&times;</button>
                    </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }

    addChild(child: Component): void {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listener: OnCloseListener): void {
        this.closeListener = listener;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement>{
    constructor() {
        super(`<ul class="page"></ul>`);
        this.element.textContent = 'This is a PageComponent';
    }

    addChild(component: Component): void {
        const item = new PageItemComponent();
        item.addChild(component);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}