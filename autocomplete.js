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
    this.textbox.addEventListener("input", function(/** @type {InputEvent}*/e)
    {      
      if (e.data == null || !this.instance.enabled) return;
      /**
       * @type {string}
       */
      var text = this.value;
      var ss = this.selectionStart;
      var se = this.selectionEnd;

      // if (text.substring(text.length-1,text.length) == " ") return;
      if (ss == text.length) {
        var rest = this.instance.run(text.split("\n").pop());
        this.value = text+rest;
        this.setSelectionRange(ss, this.value.length);
      }
    });
    this.textbox.addEventListener("keydown", function(e) {
      if (this.instance.tabFill && e.keyCode == 9) {
        var ss = this.selectionStart;
        var se = this.selectionEnd;
        if (se == this.value.length && ss < this.value.length) {
          e.preventDefault();
          this.value = this.value += " ";
          this.setSelectionRange(this.value.length, this.value.length);
          
          ss = this.selectionStart;
          var rest = this.instance.run(this.value.split("\n").pop());
          this.value = this.value+rest;
          this.setSelectionRange(ss, this.value.length);
        }
      }
      if (e.keyCode == 39) {
        var ss = this.selectionStart;
        var se = this.selectionEnd;
        if (se == this.value.length) {
          this.setSelectionRange(this.value.length, this.value.length);
          ss = this.selectionStart;
          se = this.selectionEnd;
          setTimeout(() => {
            var rest = this.instance.run(this.value.split("\n").pop(), true);
            this.value = this.value+rest;
            this.setSelectionRange(ss, this.value.length);
          }, 0);
        }
      }
    });
  }

  /**
   * The current state of activation. If ``true``, autocompletion will happen. (Default: ``true``)
   */
  enabled = true;

  /**
   * If the autocompletion should be case sensitive. (Default: ``false``)
   */
  caseSensitive = false;

  /**
   * If the autocompletion should check only the full text (Set to `true`) or check first the full text, then with one less word from the start, then one less, etc.. (Default: ``false``)
   */
  onlyFullText = false;

  /**
   * When ``Tab`` is press and an autocompletion is present, should it fill instead of tab stopping? (Default: ``true``)
   */
  tabFill = true;

  /**
   * The minimum about of characters in a string or word to begin suggesting autocompletions. (Default: ``1``)
   */
  minChars = 1;

  /**
   * List of words and sentences available for autocompletions.
   * This list is automatically sorted by shortest to longest string when executed. (Default: ``[ ]``)
   * @type {string[]}
   */
  completions = [];

  /**
   * The character to separate words by (Default: ``" "``)
   */
  separateBy = " ";

  /**
   * Run the autocompletion and return what is remaining to write.
   * @param {string} input The text to check if matches any autocomplete strings.
   * @param {boolean} excludeIdentical If it should exclude autocompletions that is identical to the input. (Default: ``false``)
   * @returns {string}
   */
  run(input, excludeIdentical = false)
  {
    var rest = "";
    if (input.length < this.minChars) {
      return rest;
    }
    this.completions.sort((a, b) => {
      return a.length - b.length;
    });

    if (input == "") {
      return rest;
    }
    for (let i = 0; i < this.completions.length; i++) {
      const word = this.completions[i];
      var _word = word;
      var _input = input;
      if (!this.caseSensitive) {
        _word = _word.toLowerCase();
        _input = _input.toLowerCase();
      }
      if (_word.startsWith(_input) && (!excludeIdentical || _word != _input)) {
        rest = word.substring(input.length);
        break;
      }
    }
    if (!this.onlyFullText && input.split(this.separateBy).length > 1 && rest == "") {
      var nInput = input.split(this.separateBy);
      nInput.shift();
      input = nInput.join(this.separateBy);
      return this.run(input, excludeIdentical);
    }
    return rest;
  }
}

try {
  exports.AutoComplete = AutoComplete;
} catch (error) { /* Ignore if non-node module */}