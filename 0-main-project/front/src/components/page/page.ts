import { BaseComponent, Component } from './../component.js';

export interface Composable {
    addChild(component: Component): void;
} 

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState ) => void;
interface SectionContainer extends Component, Composable  {
    setOnCloseListener(listener: OnCloseListener): void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
    muteChildren(state: 'mute' | 'unmute'): void;
    getBoundingRect(): DOMRect;
    onDropped(): void;
}
type SectionContainerConstructor = {
    new(): SectionContainer;
}
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener? : OnCloseListener;
    private dragStateListener? : OnDragStateListener<PageItemComponent>;
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
        this.element.addEventListener('dragenter', (event: DragEvent) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event: DragEvent) => {
            this.onDragLeave(event);
        });
    }

    onDragStart(_: DragEvent): void {
        this.notifyDragObservers('start');
        this.element.classList.add('lifted');
    }

    onDragEnd(_: DragEvent): void {
        this.notifyDragObservers('stop');
        this.element.classList.remove('lifted');
    }

    onDragEnter(_: DragEvent): void {
        this.notifyDragObservers('enter');
        this.element.classList.add('drop-area');
    }

    onDragLeave(_: DragEvent): void {
        this.notifyDragObservers('leave');
        this.element.classList.remove('drop-area');
    }

    onDropped(): void {
        this.element.classList.remove('drop-area');
    }

    notifyDragObservers(state: DragState): void {
        this.dragStateListener && this.dragStateListener(this, state);
    }

    addChild(child: Component): void {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listener: OnCloseListener): void {
        this.closeListener = listener;
    }

    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>): void {
        this.dragStateListener = listener;
    }

    muteChildren(state: 'mute' | 'unmute'): void {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        } else {
            this.element.classList.remove('mute-children');
        }
    }

    getBoundingRect(): DOMRect {
        return this.element.getBoundingClientRect();
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    private children = new Set<SectionContainer>();
    private dragTarget?: SectionContainer;
    private dropTarget?: SectionContainer;
    
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
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        console.log('🎃 drop!!!!!');
        // switch position
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && (this.dropTarget !== this.dragTarget)) {
            const dropY = event.clientY;
            const srcElemntY = this.dragTarget.getBoundingRect().y;
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElemntY ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    }

    addChild(section: Component): void {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'stop':
                    console.log('stop');
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    this.dropTarget = target;
                    console.log('enter', this.dropTarget);
                    break;
                case 'leave':
                    this.dropTarget = undefined;
                    console.log('leave');
                    break;
                default:
                    throw new Error('mismatched state');
            }
        });
    }
    
    private updateSections(state: 'mute' | 'unmute') {
        this.children.forEach((section: SectionContainer) => {
            section.muteChildren(state);
        });
    }
}