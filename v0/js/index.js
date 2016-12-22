HTMLElement.prototype.keyboard = function(target, textSpeed, aleaSpeed, content, callback) {
    if (!handleError(this, target, arguments))
	return (1);
    if (typeof(content) != "string") {
	if (typeof(content) == "function")
	    callback = content;
	content = null;
    } else
	callback = (typeof(callback) == "function") ? callback : function(){return null;};

    var addLetter = getAddLetter(this, target);
    var tabLetter = getTabLetter(this, target, content);
    var tabSpeed = getTabSpeed(tabLetter, textSpeed, aleaSpeed);


    var i = 0, elem = this;
    (function loop(){
	addLetter(tabLetter[i]);
	if (tabLetter[i] === tabLetter[i-1])
	    tabSpeed[i]*= 1.8;
	i++;
	((tabLetter[i]) ? setTimeout(loop, tabSpeed[i]) : callback());
    })();
}

function handleError(elem, target, args) {
    var isOK = false, err = new Error();
    var errLine = "%c"+err.stack.split("\n")[(err.stack.split("\n").length - 1)];
    var errMsg = "%cTypeWriter : Bad target name when calling HTMLElement.type(...). Available targets for ";

    switch (elem.tagName.toString()) {
    case "INPUT":((target == "placeholder" || target == "value") ? isOK=true : (console.log(errMsg+"INPUT are : 'placeholder' and 'value'" + errLine,"color: red","color:black")));break;
    case "TEXTAREA":((target == "placeholder" || target == "html") ? isOK=true : (console.log(errMsg+"TEXTAREA are : 'placeholder' and 'html'" + errLine,"color:red","color:black")));break;
    default:((target == "html") ? isOK=true :  (console.log(errMsg+"basic tags is : 'html'" + errLine, "color:red", "color:black")));break;
    }

    if (isOK === true) {
	if ((args.length < 3 || typeof(args[1]) !=  "number" || typeof(args[2]) !=  "number"
	     ||  (typeof(args[3]) != "function" && typeof(args[3]) != "string" && typeof(args[3]) != "undefined")
	     ||  (typeof(args[4]) != "function" && typeof(args[4]) != "string" && typeof(args[4]) != "undefined"))) {
	    isOK = false;
	    console.log("%cTypeWriter : Calling HTMLElement.type(...) with wrong arguments. Prototype is : HTMLElement.type(target, textSpeed, aleaSpeed, [content], [callback])" + errLine, "color:red","color:black");
	}
    }
    return (isOK);
}

function getAddLetter(elem, target) {
    var addLetter;
    switch (target) {
    case "placeholder" : addLetter = function(letter) {elem.setAttribute("placeholder", elem.getAttribute("placeholder") + letter);}; break;
    case "value" : addLetter = function(letter) {elem.setAttribute("value", elem.getAttribute("value") + letter);}; break;
    case "html" : addLetter = function(letter) {elem.innerHTML+=letter;}; break;
    }
    return (addLetter);
}


function getTabLetter(elem, target, content) {
    var text, arrText = [], i;
    switch (target) {
    case "placeholder" : text = (content == null) ? elem.getAttribute("placeholder") : content; if (content == null) elem.setAttribute("placeholder", ""); break;
    case "value" : text =  (content == null) ? elem.getAttribute("value") : content; if (content == null) elem.setAttribute("value", ""); break;
    case "html" : text =  (content == null) ? elem.innerHTML : content; if (content == null) elem.innerHTML = ""; break;
    }

    for (i=0; i < text.length; i++)
	arrText.push(text[i]);

    return (arrText);
}

function getTabSpeed(tabLetter, textSpeed, aleaSpeed) {
    var arrSpeed = [];
    for (i=0; i < tabLetter.length; i++)
	arrSpeed.push(Math.floor((Math.random() * aleaSpeed) + textSpeed));

    return (arrSpeed);
}


HTMLElement.prototype.backspace = function(target, textSpeed, aleaSpeed, callback) {
    if (!handleError(this, target, arguments))
	return (1);
    callback = (typeof(callback) == "function") ? callback : function(){return null};

    var textLength = getTextLength(this, target);
    var removeLetter = getRemoveLetter(this, target);

    var i = textLength, elem = this;
    (function loop(){
	removeLetter();
	i--;
	((i > 0) ? setTimeout(loop, (Math.random() * aleaSpeed) + textSpeed) : callback());
    })();
}

function getRemoveLetter(elem, target) {
    var removeLetter;
    switch (target) {
    case "placeholder" : removeLetter = function(letter) {elem.setAttribute("placeholder", elem.getAttribute("placeholder").slice(0,-1));}; break;
    case "value" : removeLetter = function(letter) {elem.setAttribute("value", elem.getAttribute("value").slice(0,-1));}; break;
    case "html" : removeLetter = function(letter) {elem.innerHTML = elem.innerHTML.toString().slice(0,-1);}; break;
    }
    return (removeLetter);
}

function getTextLength(elem, target) {
    var textLength;
    switch (target) {
    case "placeholder" : textLength = elem.getAttribute("placeholder").length;break;
    case "value" : textLength = elem.getAttribute("value").length;break;
    case "html" : textLength = elem.innerHTML.length;break;
    }
    return (textLength);
}
