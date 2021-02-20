import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLIFrameElement> {
    constructor(url: string, title: string) {
        super(`<section class="video">
                <div class="video_player"><iframe frameborder="0" class="video__iframe"></iframe></div>
                <h3 class="video__title"></h3>
            </section>`);
        const videoElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        videoElement.src = this.convertedToEmbedded(url);
        videoElement.title = title;
        videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        videoElement.allowFullscreen = true;
        videoElement.width = '500';
        videoElement.height = '250';

        const videoTitle = this.element.querySelector('.video__title')! as HTMLHeadingElement;
        videoTitle.textContent = title;
    }

    private convertedToEmbedded(url: string): string {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        const videoId = match ? match[1] || match[2] : undefined;
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}