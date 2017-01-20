# Vanilla-Typist

Vanilla Typist is a Javascript Front-End micro-library that simulate someone writing on a keyboard.
This library provides the method `keyboard` and `backspace` to HTML Elements. These methods can be used on any HTML Tag with no childrens like `<p>`, `<span>`, empty `<div>`, `<a>` ... And on `input` and `textarea`.

## How to use it ?
```javascript
HTMLElement.keyboard({[target], [writeSpeed], [aleaSpeed], [textToWrite]}, callback);
```

- `target` can be "html", "value" or "placeholder" depending on the tag's type (div, input, textarea)
- `writeSpeed` is the speed between two letters (in ms)
- `aleaSpped` is added to the `writeSpeed` because nobody can type at a constant speed.
- `textToWrite` is the text that will be written in your HTMLElement (it will be added if there is already some text)
- `callback` is the callback

> all parameters are optional.

## Examples

```javascript
var elem = document.getElementsByClassName('elem')[0];
var input = document.getElementById("input");
var textarea = document.getElementById("textarea");

input.setAttribute("placeholder", "");
input.keyboard({ target: "placeholder", writeSpeed: 50, aleaSpeed: 90, textToWrite: "There's a lady who's sure all that glitters is gold" }, function() {
    input.keyboard({ target: "value", TextToWrite: "And she's buying a stairway to heaven." }, function() {
        input.backspace({ target: "value" } function() {
            console.log("removed")
        });
    });
});
```
