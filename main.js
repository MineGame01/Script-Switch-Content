const createButtonToggle = ({ title, valueAttribute, className = " ", onClick, }) => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = title;
    buttonElement.setAttribute("value", valueAttribute);
    buttonElement.onclick = onClick;
    buttonElement.className = className;
    return buttonElement;
};
export function setupScrollingText({ menuElement, pagesElement }) {
    const ulElement = menuElement.querySelector("ul"), switchBtnOneEl = menuElement.querySelector("button:first-child"), switchBtnTwoEl = menuElement.querySelector("button:last-child");
    if (ulElement === null || switchBtnOneEl === null || switchBtnTwoEl === null) {
        console.error("Switch Content: Element not found!");
        return;
    }
    let currentPage;
    let listPageId = [];
    let listPageName = [];
    for (let pageElement of Array.from(pagesElement.children)) {
        const pageId = pageElement.dataset.pageId;
        const pageName = pageElement.dataset.pageName;
        pageId !== undefined && listPageId.push(pageId);
        pageName !== undefined && listPageName.push(pageName);
    }
    const liElementButtonToggle = listPageName.map((name, index) => {
        const liElement = document.createElement("li");
        const buttonElement = createButtonToggle({
            title: name,
            valueAttribute: listPageId[index],
            className: menuElement.dataset.switchBtnClass,
            onClick: function () {
                setPageValueSideBarContent(listPageId[index]);
            }
        });
        liElement.appendChild(buttonElement);
        ulElement.appendChild(liElement);
        return liElement;
    });
    const updateCurrentPage = () => {
        currentPage = getPageValueSideBarContent();
    };
    const getPageValueSideBarContent = () => pagesElement.getAttribute("page");
    const setPageValueSideBarContent = (value) => {
        pagesElement.setAttribute("page", value);
        updatePage();
    };
    if (getPageValueSideBarContent() === null)
        setPageValueSideBarContent(listPageId[0]);
    function updatePage() {
        updateCurrentPage();
        liElementButtonToggle.forEach(li => {
            if (li.firstElementChild !== null) {
                const buttonToggleEl = li.firstElementChild;
                const valueButton = buttonToggleEl.getAttribute("value");
                buttonToggleEl.disabled = valueButton === currentPage;
            }
        });
        listPageId.forEach(page => {
            const pageElement = pagesElement.querySelector(`[data-page-id="${page}"]`);
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
    }
    const switchBtnOneElPath = switchBtnOneEl.dataset.switchBtnPath;
    const switchBtnTwoElPath = switchBtnTwoEl.dataset.switchBtnPath;
    const checkPath = (path) => {
        if (path !== "back" && path !== "next") {
            throw Error("data-switch-btn-path Attribute not found! Please check the buttons in the menu");
        }
        else
            return path;
    };
    switchBtnTwoEl.onclick = () => changePage(checkPath(switchBtnTwoElPath));
    switchBtnOneEl.onclick = () => changePage(checkPath(switchBtnOneElPath));
    updatePage();
}

{
    const menuElement = document.getElementById("menu");
    const pagesElement = document.getElementById("pages");
    setupScrollingText({ menuElement, pagesElement });
}
