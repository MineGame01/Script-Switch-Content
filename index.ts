type TElement = HTMLElement;

export class SwitchContent {
    /**
     *  This object with pair "content id" (key) and "content name" (property)
     */
    private availableContents: { [key: string]: string };
    /**
     * Contains a reference to the ul tag node in the control
     */
    private controllersElement: TElement | null;
    /**
     * Contains a link to the parent node of all defined content
     */
    private contentsElement: TElement;
    /**
     * Contains a reference to the parent node of all controls
     */
    private menuElement: TElement;

    /**
     * Initializing the script
     *
     * @param menuElement An HTML Node element that contains elements to control content
     * @param contentsElement The HTML Node element that defines accessible content
     */
    constructor(menuElement: TElement, contentsElement: TElement) {
        this.menuElement = menuElement;
        this.contentsElement = contentsElement;

        this.availableContents = this.extractionContents(this.contentsElement);
        this.controllersElement = this.menuElement.querySelector(
            "ul"
        ) as TElement | null;

        if (!this.controllersElement) {
            console.error(
                "Tag 'ul' was not found in the element",
                this.menuElement
            );
        }

        // Defining navigation buttons
        this.createButtonsNavigation(this.availableContents).forEach(
            (button) => {
                const liElement = document.createElement("li");
                liElement.appendChild(button);
                if (this.controllersElement) {
                    this.controllersElement.appendChild(liElement);
                }
            }
        );

        // Set the current page value if there is no value
        if (!this.getCurrentContentId())
            this.setAttributeValuefromContentsElement(
                Object.keys(this.availableContents)[0]
            );

        /**
         * Defines logic based on its parameters for content switching buttons
         */
        const settingSwitchButton = (menuElement: typeof this.menuElement) => {
            const switchButtons = [
                ...menuElement.querySelectorAll("button"),
            ].filter((button) => button.hasAttribute("data-switch-btn-path"));

            const checkPath = (
                path: string | undefined | null
            ): "next" | "back" | undefined => {
                if (path !== "back" && path !== "next") {
                    console.error(
                        "data-switch-btn-path Attribute value is wrong! Please check the buttons in the menu"
                    );
                } else return path;
            };

            const switchBtnOnePath = checkPath(
                switchButtons[0].dataset.switchBtnPath
            );
            const switchBtnTwoPath = checkPath(
                switchButtons[1].dataset.switchBtnPath
            );

            if (switchBtnOnePath) {
                switchButtons[0].addEventListener("click", () =>
                    this.switchContent(switchBtnOnePath)
                );
            }

            if (switchBtnTwoPath) {
                switchButtons[1].addEventListener("click", () =>
                    this.switchContent(switchBtnTwoPath)
                );
            }
        };

        settingSwitchButton(this.menuElement);
        this.update();
    }

    /**
     * Returns the current content ID.
     *
     * @returns Current content id
     */
    private getCurrentContentId() {
        return this.contentsElement.dataset.idCurrentContent;
    }

    /**
     * Use to set the current content, after setting the value the update function is called
     *
     * @param content id
     */
    private setAttributeValuefromContentsElement(contentId: string) {
        this.contentsElement.setAttribute("data-id-current-content", contentId);
        this.update();
    }

    /**
     * Method that updates the rendering state of all elements with the current values
     */
    private update() {
        const idCurrentContent = this.getCurrentContentId();

        /**
         * Updates the state of the buttons. If the current content ID matches the navigation button ID, the button becomes disabled.
         *
         * @param id current content
         */
        const updateButton = (contentId: string) => {
            if (this.controllersElement) {
                this.controllersElement.querySelectorAll("li").forEach((li) => {
                    const toggleButton = li.querySelector("button");
                    if (toggleButton) {
                        toggleButton.disabled =
                            toggleButton.dataset.contentId === contentId;
                    }
                });
            }
        };

        /**
         * It scans all content and hides the content that are currently inactive.
         *
         * @param id current content
         */
        const updateContents = (contentId: string) => {
            this.contentsElement.querySelectorAll("div").forEach((content) => {
                if (content.dataset.contentId === contentId) {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            });
        };

        if (idCurrentContent) {
            updateButton(idCurrentContent);
            updateContents(idCurrentContent);
        }
    }

    /**
     * A method used to switch content in a specific direction.
     *
     * @param path
     */
    private switchContent(path: "next" | "back") {
        const idsAllContents =
            path === "back"
                ? Object.keys(this.availableContents).reverse()
                : Object.keys(this.availableContents);
        const idCurrentContent = this.getCurrentContentId();

        if (idCurrentContent) {
            const currentIndexContent =
                idsAllContents.indexOf(idCurrentContent);

            if (currentIndexContent !== idsAllContents.length - 1) {
                this.setAttributeValuefromContentsElement(
                    idsAllContents[currentIndexContent + 1]
                );
            } else if (currentIndexContent === idsAllContents.length - 1) {
                this.setAttributeValuefromContentsElement(idsAllContents[0]);
            }
        }
    }

    /**
     * Extracting available content
     *
     * @param contentsElement The HTML Node element that defines accessible content
     * @returns This object with pair "content id" (key) and "content name" (property)
     */
    private extractionContents(contentsElement: TElement) {
        const availableContents = Array.from(
            contentsElement.children
        ) as Array<TElement>;

        const data: typeof this.availableContents = {};

        availableContents.forEach((content) => {
            const contentId = content.dataset.contentId;
            const contentName = content.dataset.contentName;
            if (contentId && contentName) {
                data[contentId] = contentName;
            }
        });

        return data;
    }

    /**
     * Create navigation buttons to toggle available content
     *
     * @param availableContents
     */
    private createButtonsNavigation(
        availableContents: typeof this.availableContents
    ) {
        return Object.keys(availableContents).map((contentId) => {
            return this.createToggleButton(
                availableContents[contentId],
                contentId,
                () => {
                    this.setAttributeValuefromContentsElement(contentId);
                },
                this.menuElement.dataset.switchBtnClass
            );
        });
    }

    /**
     * Create toggle button for switch content
     *
     * @param title Content name
     * @param valueAttribute Content id
     * @param listener Event callback function for switch contents by id
     * @param className CSS Selectors
     * @param onClick
     */
    private createToggleButton(
        title: string,
        valueAttribute: string,
        listener?: (this: HTMLButtonElement, ev: MouseEvent) => any,
        className?: string,
        onClick?: GlobalEventHandlers["onclick"]
    ) {
        const buttonElement = document.createElement("button");
        buttonElement.innerText = title;
        buttonElement.setAttribute("data-content-id", valueAttribute);
        buttonElement.onclick = onClick ?? null;
        if (listener) {
            buttonElement.addEventListener("click", listener);
        }
        if (className) {
            buttonElement.className = className;
        }
        return buttonElement;
    }
}
