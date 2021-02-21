import { BaseComponent, Component } from './../component.js';

export interface Composable {
    addChild(component: Component): void;
} 

type OnCloseListener = () => void;
interface SectionContainer extends Component, Composable  {
    setOnCloseListener(listener: OnCloseListener): void;
}
type SectionContainerConstructor = {
    new(): SectionContainer;
}
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;
    constructor() {
        super(`<li draggable="true" class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close">&times;</button>
                    </div>
                </li>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event);
        });
    }

    onDragStart(event: DragEvent): void {
        console.log('😎 drag start', event);
    }

    onDragEnd(event: DragEvent): void {
        console.log('🤣 drag end', event)
    }

    addChild(child: Component): void {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listener: OnCloseListener): void {
        this.closeListener = listener;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        });
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        console.log('😜 dragging over...');
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        console.log('🎃 drop!!!!!');
    }

    addChild(section: Component): void {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}