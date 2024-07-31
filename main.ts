import { setupScrollingText} from "./scrolling-text.js";

{
    const menuElement = document.getElementById("menu") as HTMLElement;
    const pagesElement = document.getElementById("pages") as HTMLElement;

    setupScrollingText({menuElement, pagesElement});
}