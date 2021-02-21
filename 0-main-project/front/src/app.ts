import { TextInputSection } from './components/dialog/input/text-input.js';
import { MediaInputSection } from './components/dialog/input/media-input.js';
import { InputDialog } from './components/dialog/dialog.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
class app {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        const imgBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        imgBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaInputSection();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
        });

        const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaInputSection();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const video = new VideoComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            });
        });

        const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textSection = new TextInputSection();
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const video = new NoteComponent(textSection.title, textSection.body);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            });
        });

        const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textSection = new TextInputSection();
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const video = new TodoComponent(textSection.title, textSection.body);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            });
        });

    }
}

new app(document.querySelector('.document')! as HTMLElement, document.body);