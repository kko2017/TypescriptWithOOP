import { Composable } from './../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    private clsoeListener?: OnCloseListener;
    private submitListener?: OnSubmitListener;
    constructor() {
        super(`<dialog class="dialog">
                <div class="dialog__container">
                    <button class="close">&times;</button>
                    <div id="dialog__body"></div>
                    <button class="dialog__submit">ADD</button>
                </div>
            </dialog>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLButtonElement;

        closeBtn.onclick = () => {
            this.clsoeListener && this.clsoeListener();
        };
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }

    addChild(child: Component): void {
        const body = this.element.querySelector('#dialog__body')! as HTMLDivElement;
        child.attachTo(body);
    }

    setOnCloseListener(listener: OnCloseListener): void {
        this.clsoeListener = listener;
    }

    setOnSubmitListener(listener: OnSubmitListener): void {
        this.submitListener = listener;
    }
}