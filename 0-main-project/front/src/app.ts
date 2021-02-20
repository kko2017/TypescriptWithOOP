import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';
import { TodoComponent } from './components/page/item/todo.js';
import { Component } from './components/component.js';
class app {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('https://picsum.photos/500/250', 'My first image');
        this.page.addChild(image);
        const video = new VideoComponent('https://www.youtube.com/watch?v=6k7a8bw451M', 'My first video');
        this.page.addChild(video);
        const note = new NoteComponent('Note Title', 'My first note');
        this.page.addChild(note);
        const todo = new TodoComponent('Todo Title', 'My first todo');
        this.page.addChild(todo);
    }
}

new app(document.querySelector('.document')! as HTMLElement);