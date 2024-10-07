import { setupScrollingText } from "./index";

{
    const menuElement = document.getElementById("menu") as HTMLElement;
    const pagesElement = document.getElementById("pages") as HTMLElement;

    setupScrollingText({ menuElement, pagesElement });
}
