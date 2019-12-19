# AutoComplete
This is a standard JavaScript (as well as Node requiriable) class that adds super easy auto completion to your input elements.

[npm](https://www.npmjs.com/package/ion-ezautocomplete)  
[Github](https://github.com/LucasionGS/AutoComplete)

## Implementation
### Standard Webpage JavaScript
If you are using this for a website and standard JavaScript in general, just add it to your ``header`` tag as any other script:
```html
<header>
  <script src="ion-ezautocomplete.js"></script>
</header>
```
### Node.js module
If you are using Node.js with Electron or something else that supports using a browser with Node.js, you can also add it as a module instead.
First install it with `npm i ion-ezautocomplete` and then require it in your javascript file.
```js
// Using {} when requiring only exports the AutoComplete class, which is the only thing you'll need as of right now.
const {AutoComplete} = require("ion-ezautocomplete");
```
If you prefer calling the class something shorter or just something else entirely, you can do that in the `require` statement.  
Example: I would write this if I want to call it ``AC`` instead.
```js
const {AutoComplete: AC} = require("ion-ezautocomplete");
```

## Getting started
Adding autocompletion is as easy as 1 line of code to get started.
```js
const instance = new AutoComplete(document.querySelector("YourInput"), ["Autocompletes"]);
// Or it can also be done using the static AutoComplete.add() function
const instance = AutoComplete.add(document.querySelector("YourInput"), ["Autocompletes"]);
```

`AutoComplete`'s constructor takes 2 arguments: `inputElement` and `completions`.  
Using `AutoComplete.add()` is completely identical to using `new Autocomplete()`.
```js
/**
  * Initialize an object and activate autocomplete.
  * @param {HTMLInputElement} inputElement Element to watch and autocomplete.
  * @param {string[]} completions Completions that this input box can autocomplete to. You can always add or remove by just modifying the ``completions`` variable of an instance.
  */
new AutoComplete(inputElement, completions = []);
```
You can easily add more dynamically by using the array ``push(string)`` function.
```js
const ac = new AutoComplete(inputElement, completions = []);
ac.completions.push("Any new completion");
```

## Array of completions
`AutoComplete` instances has an array variable called `completions`. You can add and remove autocompletion strings dynamically by editing this.  
**Default: `[]`**
```js
/**
  * List of words and sentences available for autocompletions.
  * This list is automatically sorted by shortest to longest string when executed.
  * @type {string[]}
  */
completions = [];
```

## Enabled/Disabled
You can disabled autocompletion temporarily until re-enabled by modifying the `enabled` variable.  
**Default: `true`**
```js
/**
  * The current state of activation. If ``true``, autocompletion will happen
  */
enabled = true;
```

## Case Sensitivity
You can toggle case sensitivity by modifying the `caseSensitive` variable.  
**Default: `false`**
```js
/**
  * If the autocompletion should be case sensitive.
  */
caseSensitive = false;
```

## Tab Fill
You can toggle between if the `Tab` button fills the autocompletion or not by editing the `tabFill` variable.  
**Default: `true`**
```js
/**
  * When ``Tab`` is press and an autocompletion is present, should it fill instead of tab stopping?
  */
tabFill = true;
```

## Minimum Characters
You can limit that the autocompletions should only be suggested if the input is more than a specified count of characters. You can set the instance variable `minChars` to the number of characters you minimum want the user to write before it starts suggesting.  
**Default: `1`**
```js
/**
  * The minimum about of characters in a string or word to begin suggesting autocompletions.
  */
minChars = 1;
```

## Word Separator
`AutoComplete` instances also carry a `separateBy` variable.  
By default this is `space` but can be set to any string. `Space` is the most logical thing to separate words by and therefore recommend to keep default.

**Default: `" "`**
```js
/**
  * The character to separate words by.
  */
separateBy = " ";
```

## Known supported element types
```html
<input>
<textarea></textarea> <!-- Multiline supported! -->
```

Go ahead and try it in action, it's super simple.