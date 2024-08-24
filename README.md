# Script Switch Content | JavaScript/TypeScript

## Description
The script allows you to easily create pages and switch between them using buttons.

## Setting
- Create 2 html tags and assign them an ID attribute.
One element will be used for page navigation.
The second element for page content.
```html
    <div id="menu"></div>
    <div id="pages"></div>
```
- In the menu element, create 2 more buttons for switching pages and a list in the middle for navigation buttons.
```html
    <div id="menu">
        <button>Back</button>
        <ul></ul>
        <button>Next</button>
    </div>
```
- Now we need to create page elements and assign unique attributes to them <code>data-page-id</code>. 
And the <code>data-page-name</code> attribute, to specify the page name
```html
    <div id="pages">
        <div 
        data-page-name="Page 1" 
        data-page-id="page-1">
            Page 1
        </div>
        <div
        data-page-name="Page 2" 
        data-page-id="page-2">
            Page 2
        </div>
        <div
        data-page-name="Page 3" 
        data-page-id="page-3">
            Page 3
        </div>
    </div>
```
- Now you need to call the function to configure and pass the reference to the elements as arguments.
```js
    const menuElement = document.getElementById("menu");
    const pagesElement = document.getElementById("pages");

    setupScrollingText({menuElement, pagesElement});
```
- Done! Now when switching pages switch.<br>
You can also style buttons etc.

## API

| Attributes  | Description |
| ------------- | ------------- |
| <code>data-page-name: string</code> | An attribute that takes a page name to create a button to navigate between pages. |
| <code>data-page-id: string</code> | An attribute that accepts a unique identifier to find the desired page to hide or show. |
| <code>data-switch-btn-class: string</code> | Assigns classes to buttons for navigating to pages. Applies to menu item.  |
| <code>data-switch-btn-path: "next" / "back" </code> | Attribute for the page switching button, sets the side to which the page will be switched. |

## End
The script will continue to be improved and corrected. <br>
This is the first time I've written scripts like this, so I think it turned out well for the first time.

## Author
Github - [MineGame01](https://github.com/MineGame01) <br>
X - [@IMineGame](https://x.com/IMineGame)