# AutoComplete
This is a standard JavaScript (as well as Node requiriable) class that adds super easy auto completion to your input elements.


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

## Array of completions
`AutoComplete` instances has an array variable called `completions`. You can add and remove autocompletion strings dynamically by editing this.
```js
/**
  * List of words and sentences available for autocompletions.
  * This list is automatically sorted by shortest to longest string when executed.
  * @type {string[]}
  */
  completions = [];
```

Go ahead and try it in action, it's super simple.