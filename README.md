# Script Switch Content | JavaScript/TypeScript

<a href="https://github.com/MineGame01/Script-Switch-Content/releases">
    <img src="https://img.shields.io/npm/v/script-switch-content" alt="Package version" />
</a>
<a href="https://www.npmjs.com/package/script-switch-content">
    <img src="https://img.shields.io/npm/dm/script-switch-content" alt="Package on npm" />
</a>
<a href="https://github.com/MineGame01/Script-Switch-Content">
    <img src="https://img.shields.io/github/stars/MineGame01/Script-Switch-Content
    " alt="GitHub Repo stars" />
</a> ⭐

## Description

<strong>The script allows you to easily create content and switch between them using buttons.</strong>

And it also helps to understand the approximate principle of operation of such logic.

## Setting

-   Create 2 html tags and assign them an ID attribute.
    One element will be used for content navigation
    The second element will be used to define all available content

```html
<div id="menu"></div>
<div id="contents"></div>
```

-   In the menu element, create 2 buttons to switch content and a list in the middle for navigation buttons.

```html
<div id="menu">
    <button data-switch-btn-path="back">Back</button>
    <ul></ul>
    <button data-switch-btn-path="next">Next</button>
</div>
```

-   Now we need to define the content and assign them unique identifiers <code>data-content-id</code>. And the attribute <code>data-content-name</code> to indicate the name of the content

```html
<div id="contents">
    <div data-content-name="Content 1" data-content-id="content-1">
        Content 1
    </div>
    <div data-content-name="Content 2" data-content-id="content-2">
        Content 2
    </div>
    <div data-content-name="Content 3" data-content-id="content-3">
        Content 3
    </div>
</div>
```

-   Now you need to get references to all the necessary elements and call the <code>SwitchContent</code> constructor.

```js
const menuElement = document.getElementById("menu");
const contentsElement = document.getElementById("contents");

new SwitchContent(menuElement, contentsElement);
```

-   <strong>Done!</strong><br>
    You can also style buttons etc.

## API

| Attributes                                          | Description                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| <code>data-content-name: string</code>              | An attribute that takes the name of the content to create a button for navigating between the content |
| <code>data-content-id: string</code>                | An attribute that accepts a unique identifier for the content to search for to hide or show           |
| <code>data-switch-btn-class: string</code>          | Assigns classes to buttons for content navigation                                                     |
| <code>data-switch-btn-path: "next" / "back" </code> | Attribute for the content switch button, specifies the side to which the content will be switched     |

## End

The code will be improved and optimized over time. <br>
This is the first time I've written scripts like this, so I think it turned out well for the first time.

30.12.2024 The code has become more documented, and I think it helps some people understand approximately how to do the same.

## Author

Github - [MineGame01](https://github.com/MineGame01) <br>

<a href="https://github.com/MineGame01/Script-Switch-Content">
    <img src="https://img.shields.io/github/stars/MineGame01/Script-Switch-Content
    " alt="GitHub Repo stars" />
</a> <br>
If the script is good, Give repo a star ⭐ ⬆️.
