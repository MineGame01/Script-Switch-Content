import { setupScrollingText} from "./switch-content.js";

{
    const menuElement = document.getElementById("menu") as HTMLElement;
    const pagesElement = document.getElementById("pages") as HTMLElement;

    setupScrollingText({menuElement, pagesElement});
}