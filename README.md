# Vanilla-Typist

Vanilla Typist is a Javascript Front-End Library that can simulate keystrokes. This library provides the method `typewrite` and `typeremove` to HTML Elements. These methods can be used on any HTML Tag with no childrens like `<p>`, `<span>`, empty `<div>`, `<a>` ... And on text input and textareas.

## How to use it ?
```
[HTMLElement].typewrite(target, writeSpeed, aleaSpeed, textToWrite, callback);
```

- `target` can be "html", "value" or "placeholder" depending on the tag's type (div, input, textarea)
- `writeSpeed` is the speed between two letters (in ms)
- `aleaSpped` is added to the `writeSpeed` because nobody can type at a constant speed.
- `textToWrite` is the text that will be written in your HTMLElement (it will be added if there is already some text)
- `callback` is the callback

> `textToWrite` and `callback` are optional

## Examples

```
var elem = document.getElementsByClassName('elem')[0];
var input = document.getElementById("input");
var textarea = document.getElementById("textarea");

input.setAttribute("placeholder", "");
input.write("placeholder", 50, 90, "There's a lady who's sure all that glitters is gold", function() {
    input.write("value", 100, 200, "And she's buying a stairway to heaven.", function() {
        input.remove("value", 50, 50, function() { console.log("removed") });
    });
});

elem.write("html", 50, 90, "hey you, out there in the cold, getting lonely getting old");

textarea.write("placeholder", 50, 40, "type something", function() {
    textarea.write("html", 50, 40, "hey you ! Out there in the cold, getting lonely getting old ... ", function() {
        console.log("DONE");
    });
});
```

[Here is a demonstration](http://steven-boehm.cloudapp.net/typist/)