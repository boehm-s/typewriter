# Vanilla-Typist

Vanilla Typist is a Javascript Front-End Library that can simulate keystrokes. This library provides the method `keyboard` and `backspace` to HTML Elements. These methods can be used on any HTML Tag with no childrens like `<p>`, `<span>`, empty `<div>`, `<a>` ... And on text input and textareas.

## How to use it ?
```javascript
HTMLElement.keyboard(target, writeSpeed, aleaSpeed, textToWrite, callback);
```

- `target` can be "html", "value" or "placeholder" depending on the tag's type (div, input, textarea)
- `writeSpeed` is the speed between two letters (in ms)
- `aleaSpped` is added to the `writeSpeed` because nobody can type at a constant speed.
- `textToWrite` is the text that will be written in your HTMLElement (it will be added if there is already some text)
- `callback` is the callback

> `textToWrite` and `callback` are optional

## Examples

```javascript
var elem = document.getElementsByClassName('elem')[0];
var input = document.getElementById("input");
var textarea = document.getElementById("textarea");

input.setAttribute("placeholder", "");
input.keyboard("placeholder", 50, 90, "There's a lady who's sure all that glitters is gold", function() {
    input.keyboard("value", 100, 200, "And she's buying a stairway to heaven.", function() {
        input.backspace("value", 50, 50, function() { console.log("removed") });
    });
});

elem.keyboard("html", 50, 90, "hey you, out there in the cold, getting lonely getting old");

textarea.keyboard("placeholder", 50, 40, "type something", function() {
    textarea.keyboard("html", 50, 40, "hey you ! Out there in the cold, getting lonely getting old ... ", function() {
        console.log("DONE");
    });
});
```

## v1

ES6 refacto and more intuitive way to use it
 ==> Love FP
