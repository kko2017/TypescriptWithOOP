import { BaseComponent } from "../../component.js";
export class ImageComponent extends BaseComponent<HTMLElement> {
    constructor(url: string, title: string) {
        super(`<section class="image">
                    <div class="image__holder"><img class="image__thumbnail"></div>
                    <h2 class="image__title"></h2>
                </section>`);        
        const imageTag = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageTag.src = url;
        imageTag.alt = title;
        const imageTitle = this.element.querySelector('.image__title')! as HTMLHeadingElement;
        imageTitle.textContent = title;
    }
}