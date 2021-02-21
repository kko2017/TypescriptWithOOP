import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new(): T;
}
class app {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        this.bindElementToDialog<MediaSectionInput>('#new-image', MediaSectionInput, (input: MediaSectionInput) => new ImageComponent(input.title, input.url));

        this.bindElementToDialog<MediaSectionInput>('#new-video', MediaSectionInput, (input: MediaSectionInput) => new VideoComponent(input.title, input.url));

        this.bindElementToDialog<TextSectionInput>('#new-todo', TextSectionInput, (input: TextSectionInput) => new TodoComponent(input.title, input.body));

        this.bindElementToDialog<TextSectionInput>('#new-note', TextSectionInput, (input: TextSectionInput) => new NoteComponent(input.title, input.body));

        this.page.addChild(new ImageComponent('First Image', 'https://picsum.photos/500/250'));
        this.page.addChild(new VideoComponent('First Video', 'https://www.youtube.com/watch?v=aLkcmxUSm9o'));
        this.page.addChild(new TodoComponent('1st note', 'Note here'));
        this.page.addChild(new VideoComponent('Second Video', 'https://www.youtube.com/watch?v=0UlOohkMZnI'));
        this.page.addChild(new NoteComponent('1st todo', 'To-do here'));
        this.page.addChild(new ImageComponent('Second Image', 'https://picsum.photos/500/250'));
        this.page.addChild(new NoteComponent('2nd note', 'Note here'));
        this.page.addChild(new TodoComponent('2nd todo', 'To-do here'));
    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string,
        inputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component
    ): void {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new inputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const section = makeSection(input);
                this.page.addChild(section);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}

new app(document.querySelector('.document')! as HTMLElement, document.body);