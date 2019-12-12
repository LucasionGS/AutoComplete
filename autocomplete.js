/**
 * Add an autocomplete functionality into any input text box with custom autocompletes!
 * @author LucasionGS https://github.com/LucasionGS
 */
class AutoComplete
{
  /**
   * Initialize an object and activate autocomplete.  
   * You can also just create a new instance like this
   * ```js
   * new AutoComplete(inputElement: HTMLInputElement, completions: string[]);
   * ```
   * @param {HTMLInputElement} inputElement Element to watch and autocomplete.
   * @param {string[]} completions Completions that this input box can autocomplete to. You can always add or remove by just modifying the ``completions`` variable of an instance.
   */
  static add(inputElement, completions = []) {
    return new AutoComplete(inputElement, completions);
  }

  /**
   * Initialize an object and activate autocomplete.
   * @param {HTMLInputElement} inputElement Element to watch and autocomplete.
   * @param {string[]} completions Completions that this input box can autocomplete to. You can always add or remove by just modifying the ``completions`` variable of an instance.
   */
  constructor(inputElement, completions = [])
  {
    this.textbox = inputElement;
    this.textbox.instance = this;
    if (completions.length > 0) {
      this.completions = completions;
    }
    this.textbox.addEventListener("input", function(e)
    {
      if (e.data == null) return;
      /**
       * @type {string}
       */
      var text = this.value;
      var ss = this.selectionStart;
      var se = this.selectionEnd;

      // if (text.substring(text.length-1,text.length) == " ") return;
      if (ss == text.length) {
        var rest = this.instance.run(text);
        this.value = text+rest;
        this.setSelectionRange(ss, this.value.length);
      }
    })
  }

  /**
   * List of words and sentences available for autocompletions.
   * This list is automatically sorted by shortest to longest string when executed.
   * @type {string[]}
   */
  completions = [];

  /**
   * The character to separate words by (Space by default)
   */
  separateBy = " ";

  /**
   * Run the autocompletion and return what is remaining to write.
   * @param {string} input The text to check if matches any autocomplete strings.
   * @returns {string}
   */
  run(input)
  {
    this.completions.sort((a, b) => {
      return a.length - b.length;
    });

    var rest = "";
    if (input == "") {
      return rest;
    }
    for (let i = 0; i < this.completions.length; i++) {
      const word = this.completions[i];
      if (word.toLowerCase().startsWith(input.toLowerCase())) {
        rest = word.substring(input.length);
        break;
      }
    }
    if (input.split(this.separateBy).length > 1 && rest == "") {
      var nInput = input.split(this.separateBy);
      nInput.shift();
      input = nInput.join(this.separateBy);
      return this.run(input);
    }
    return rest;
  }
}

try {
  exports.AutoComplete = AutoComplete;
} catch (error) { /* Ignore if non-node module */}