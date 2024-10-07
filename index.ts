interface Props {
    menuElement: HTMLElement,
    pagesElement: HTMLElement,
}

interface CreateButtonToggleProps {
    title: string, 
    valueAttribute: string,
    className?: string,
    onClick: (e: MouseEvent) => void,
}

// Function for creating buttons for switching pages
const createButtonToggle = ({
    title, 
    valueAttribute,
    className = " ",
    onClick,
}: CreateButtonToggleProps): HTMLButtonElement => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = title;
    buttonElement.setAttribute("value", valueAttribute);
    buttonElement.onclick = onClick;
    buttonElement.className = className;
    return buttonElement;
}

export function setupScrollingText({
    menuElement, 
    pagesElement
}: Props) {
    const 
        ulElement = menuElement.querySelector("ul"),
        switchBtnOneEl = menuElement.querySelector("button:first-child") as HTMLButtonElement | null,
        switchBtnTwoEl = menuElement.querySelector("button:last-child") as HTMLButtonElement | null

    if (ulElement === null || switchBtnOneEl === null || switchBtnTwoEl === null) {
        console.error("Switch Content: Element not found!");
        return;
    }

    let currentPage: string;

    //Getting page names and IDs
    let listPageId: Array<string> = [];
    let listPageName: Array<string> = [];
    for (let pageElement of Array.from(pagesElement.children) as Array<HTMLElement>) {
        const pageId = pageElement.dataset.pageId;
        const pageName = pageElement.dataset.pageName;
        pageId !== undefined && listPageId.push(pageId);
        pageName !== undefined && listPageName.push(pageName);
    }

    // An array of li elements that contain a buttons
    // Buttons for switching pages
    const liElementButtonToggle: Array<HTMLLIElement> = listPageName.map((name, index) => {
        const liElement = document.createElement("li");
        // Calling a function to create the required buttons
        const buttonElement = createButtonToggle({
            title: name,
            valueAttribute: listPageId[index],
            className: menuElement.dataset.switchBtnClass,
            onClick: function() {
                setPageValueSideBarContent(listPageId[index]);
            }
        });
        liElement.appendChild(buttonElement);
        ulElement.appendChild(liElement);
        return liElement;
    });

    // Sync current page value
    const updateCurrentPage = () => {
        currentPage = getPageValueSideBarContent() as string;
    }

    // Get current page
    const getPageValueSideBarContent = () => pagesElement.getAttribute("page");
    // Set current page and update ui 
    const setPageValueSideBarContent = (value: string) => {
        pagesElement.setAttribute("page", value);
        updatePage();
    }

    // Set the current page value if there is no value
    if (getPageValueSideBarContent() === null) setPageValueSideBarContent(listPageId[0]);

    function updatePage() {
        updateCurrentPage();

        // If the button attribute value is equal to the current page then apply styles
        // Indicates the current page
        liElementButtonToggle.forEach(li => {
            if (li.firstElementChild !== null) {
                const buttonToggleEl = li.firstElementChild as HTMLButtonElement;
                const valueButton = buttonToggleEl.getAttribute("value") as string;
                buttonToggleEl.disabled = valueButton === currentPage
            }
        });

        // Shows the page if the value of available pages is equal to the current page. If not, then hides it.
        listPageId.forEach(page => {
            const pageElement = pagesElement.querySelector(`[data-page-id="${page}"]`) as HTMLElement | null;
            if (pageElement !== null) pageElement.style.display = currentPage === page ? "block" : "none";
        });
    }

    // Function for switching pages
    function changePage(path: "next" | "back") {
        updateCurrentPage();

        let listPageCopy = path === "back" ? [...listPageId].reverse() : listPageId;
        let index = listPageCopy.indexOf(currentPage);

        if (index !== listPageCopy.length - 1) {
            // If the current page is not the last one, then go to the next one
            setPageValueSideBarContent(listPageCopy[index + 1]);
        } else if (index === listPageCopy.length - 1) {
            // If the current page is the last one, then go to the beginning
            setPageValueSideBarContent(listPageCopy[0]);
        }
    }


    const switchBtnOneElPath = switchBtnOneEl.dataset.switchBtnPath;
    const switchBtnTwoElPath = switchBtnTwoEl.dataset.switchBtnPath;
    const checkPath = (path: string | undefined | null): "next" | "back" => {
        if (path !== "back" && path !== "next") {
            throw Error("data-switch-btn-path Attribute not found! Please check the buttons in the menu")
        } else return path;
    }
    switchBtnTwoEl.onclick = () => changePage(checkPath(switchBtnTwoElPath));
    switchBtnOneEl.onclick = () => changePage(checkPath(switchBtnOneElPath));

    updatePage();
}