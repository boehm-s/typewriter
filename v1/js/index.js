// todo : a function to fill default object

HTMLElement.prototype.keyboard = function(obj, /*target, textSpeed, aleaSpeed, content,*/ callback) {
    let errObj = handleError(this, obj.target, arguments);
    if (!errObj.isOK) {
	throw new Error(errObj.message);
	return 1;
    } if (typeof(content) !== "string") {
	if (typeof(content) === "function")
	    callback = content;
	content = null;
    } else
	callback = (typeof(callback) === "function") ? callback : () => null;

    let addLetter = getAddLetter(this, obj.target);
    let tabLetter = getTabLetter(this, obj.target, obj.content);
    let tabSpeed = getTabSpeed(tabLetter, obj.textSpeed, obj.aleaSpeed);


    var i = 0, elem = this; // loop closure --> BAD

    return (function loop(){
	addLetter(tabLetter[i]);
	if (tabLetter[i] === tabLetter[i - 1])
	    tabSpeed[i] *= 1.8;
	i++;
	return ((tabLetter[i]) ? setTimeout(loop, tabSpeed[i]) : callback());
    })();
};

const handleError = (elem, target, args) => {
    let retObj = {isOK: false};
    let errMsg = "TypeWriter : Bad target name when calling HTMLElement.keyboard(...). Available targets for";
    let tagName = elem.tagName.toString();

    if (tagName === 'INPUT') {
	retObj = (target === 'placeholder' || target === 'value')
	    ? {isOK: true}
	: {isOK: false, message: `${errMsg} INPUT are : 'placeholder' and 'value'`};
    } else if (tagName === 'TEXTAREA') {
	retObj = (target === "placeholder" || target == "html")
	    ? {isOK: true}
	: {isOK: false, message: `${errMsg} TEXTAREA are : 'placeholder' and 'html'`};
    } else {
	retObj = (target == "html")
	    ? {isOK: true}
	: {isOK: false, message: `${errMsg} non-input or non-textarea elements is : 'html'`};
    }

    if (retObj.isOK === true) {
    	if (args.length > 2
	    || (args[0].target && typeof(args[0].target) !== 'string')
	    || (args[0].textSpeed && typeof(args[0].textSpeed) !== 'number')
	    || (args[0].aleaSpeed && typeof(args[0].aleaSpeed) !== 'number')
	    || (args[0].content && typeof(args[0].content) !== 'string')) {

    	    retObj.isOK = false;
    	    retObj.message = 'TypeWriter : Calling HTMLElement.keyboard(...) with wrong arguments. Prototype is : HTMLElement.keyboard({target, textSpeed, aleaSpeed, [content]}, [callback])';
    	}
    }

    return (retObj);
};

const  getAddLetter = (elem, target) => {
    var addLetter;
    switch (target) {
    case "placeholder" : addLetter = function(letter) {elem.setAttribute("placeholder", elem.getAttribute("placeholder") + letter);}; break;
    case "value" : addLetter = function(letter) {elem.setAttribute("value", elem.getAttribute("value") + letter);}; break;
    case "html" : addLetter = function(letter) {elem.innerHTML+=letter;}; break;
    }
    return (addLetter);
};


const getTabLetter = (elem, target, content) => {
    var text;
    switch (target) {
    case "placeholder" : text = (content == null) ? elem.getAttribute("placeholder") : content; if (content == null) elem.setAttribute("placeholder", ""); break;
    case "value" : text =  (content == null) ? elem.getAttribute("value") : content; if (content == null) elem.setAttribute("value", ""); break;
    case "html" : text =  (content == null) ? elem.innerHTML : content; if (content == null) elem.innerHTML = ""; break;
    }

    return text.split('');
};

const getTabSpeed = (tabLetter, textSpeed, aleaSpeed) => {
    let arrSpeed = Array(tabLetter.length)
	    .fill()
	    .map(_ => Math.floor((Math.random() * aleaSpeed) + textSpeed));

    return (arrSpeed);
};


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
