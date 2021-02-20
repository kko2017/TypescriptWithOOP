export class ImageComponent {
    private element: HTMLElement;
    constructor(url: string, title: string) {
        const template = document.createElement('template');
        template.innerHTML = `<section class="image">
        <div class="image__holder"><img class="image__thumbnail"></div>
        <p class="image__title"></p>
        </section>`;

        this.element = template.content.firstElementChild! as HTMLElement;
        const imageTag = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageTag.src = url;
        imageTag.alt = title;
        const imageTitle = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        imageTitle.textContent = title;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin'): void {
        parent.insertAdjacentElement(position, this.element);
    }
}