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