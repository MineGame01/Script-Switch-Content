export function setupScrollingText({ menuElement, pagesElement, colorsButton = {
    active: "black",
    noActive: "gray",
}, }) {
    const ulElement = menuElement.querySelector("ul");
    const backBtnElement = menuElement.querySelector("button:first-child");
    const nextBtnElement = menuElement.querySelector("button:last-child");
    if (ulElement === null || backBtnElement === null || nextBtnElement === null) {
        console.error("Script scrolling text: Element not found!");
        return;
    }
    if (backBtnElement === null || nextBtnElement === null) {
        console.log("Script scrolling text: Button Elements not found!");
        return;
    }
    const getPageValueSideBarContent = () => pagesElement.getAttribute("page") || listPageId[0];
    const setPageValueSideBarContent = (value) => pagesElement.setAttribute("page", value);
    let listPageId = [];
    let listPageName = [];
    for (let pageElement of Array.from(pagesElement.children)) {
        const pageId = pageElement.getAttribute("id");
        const pageName = pageElement.dataset.pageName;
        pageId !== null && listPageId.push(pageId);
        pageName !== undefined && listPageName.push(pageName);
    }
    if (getPageValueSideBarContent() === null)
        setPageValueSideBarContent(listPageId[0]);
    let currentPage;
    const updateCurrentPage = () => {
        currentPage = getPageValueSideBarContent();
    };
    //Array Li elements with buttons toggle
    const arrayLiElementButtonToggle = listPageName.map((name, index) => {
        //Create toggle buttons 
        const liElement = document.createElement("li");
        const buttonElement = document.createElement("button");
        buttonElement.innerText = name;
        buttonElement.setAttribute("value", listPageId[index]);
        buttonElement.onclick = function () {
            setPageValueSideBarContent(listPageId[index]);
            updatePage();
        };
        buttonElement.className = menuElement.dataset.classNameBtn || " ";
        liElement.appendChild(buttonElement);
        return liElement;
    });
    for (let liElement of arrayLiElementButtonToggle) {
        ulElement.appendChild(liElement);
    }
    function updatePage() {
        updateCurrentPage();
        arrayLiElementButtonToggle.forEach(li => {
            if (li.firstElementChild !== null) {
                const buttonToggle = li.firstElementChild;
                const valueButton = buttonToggle.getAttribute("value");
                buttonToggle.style.color = valueButton === currentPage ? colorsButton.active : colorsButton.noActive;
            }
        });
        listPageId.forEach(page => {
            const pageElement = pagesElement.querySelector("#" + page);
            if (pageElement !== null)
                pageElement.style.display = currentPage === page ? "block" : "none";
        });
    }
    function changePage(path) {
        updateCurrentPage();
        let listPageCopy = path === "back" ? [...listPageId].reverse() : listPageId;
        let index = listPageCopy.indexOf(currentPage);
        if (index !== listPageCopy.length - 1) {
            setPageValueSideBarContent(listPageCopy[index + 1]);
        }
        else if (index === listPageCopy.length - 1) {
            setPageValueSideBarContent(listPageCopy[0]);
        }
        updatePage();
    }
    if (nextBtnElement !== null)
        nextBtnElement.onclick = () => changePage("next");
    if (backBtnElement !== null)
        backBtnElement.onclick = () => changePage("back");
    updatePage();
}
