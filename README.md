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
- In the menu element, create 2 more buttons for switching pages and a list in the middle for additional buttons.
```html
    <div id="menu">
        <button>Back</button>
        <ul></ul>
        <button>Next</button>
    </div>
```
- Now we need to create page elements and assign them unique IDs. And the <code>data-page-name</code> attribute, to specify the page name
```html
    <div id="pages">
        <div 
        data-page-name="Page 1" 
        id="page-1">Page 1</div>
        <div
        data-page-name="Page 2" 
        id="page-1">Page 2</div>
        <div
        data-page-name="Page 3" 
        id="page-1">Page 3</div>
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
<code>data-class-name-btn: string</code> - Assigns classes to additional page switching buttons. Applies to menu item

## End
The script will continue to be improved and corrected. <br>
This is the first time I've written scripts like this, so I think it turned out well for the first time.

## Author
Github - [MineGame01](https://github.com/MineGame01) <br>
X - [@IMineGame](https://x.com/IMineGame)