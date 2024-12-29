import { SwitchContent } from "./index";

{
    const menuElement = document.getElementById("menu") as HTMLElement;
    const contentsElement = document.getElementById("contents") as HTMLElement;

    const switchContent = new SwitchContent(menuElement, contentsElement);
}
