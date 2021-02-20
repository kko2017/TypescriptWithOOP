export function $<T extends HTMLElement = HTMLDivElement>(selector: string): T {
    const element = document.querySelector(selector);
    return element! as T;
}