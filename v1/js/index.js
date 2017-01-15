HTMLElement.prototype.keyboard = function(obj, callback) {
    let errObj = handleError(this, obj.target, arguments);
    if (!errObj.isOK) {
	throw new Error(errObj.message);
	return 1;
    }
    obj = fillDefaultObj(this, obj);
    callback = (typeof(callback) === "function") ? callback : () => null;

    let addLetter = getAddLetter(this, obj.target);
    let tabLetter = getTabLetter(this, obj.target, obj.content);
    let tabSpeed = getTabSpeed(tabLetter, obj.textSpeed, obj.aleaSpeed);


    let i = 0;
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
	retObj = (target === 'placeholder' || target == 'html')
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

const fillDefaultObj = (self, obj = {}) => {
    if (!obj.target)
	obj.target = typeof(self) === 'INPUT' ? 'value' : 'html';
    if (!obj.textSpeed)
	obj.textSpeed = 50;
    if (!obj.aleaSpeed)
	obj.aleaSpeed = 90;

    return obj;
};

const  getAddLetter = (elem, target) => {
    let addLetterObj = [
	{ target: "placeholder",    addLetter(letter) { elem.setAttribute(this.target, `${elem.getAttribute(this.target)} ${letter}`); } },
	{ target: "value",	    addLetter(letter) { elem.setAttribute(this.target, `${elem.getAttribute(this.target)} ${letter}`); } },
	{ target: "html",	    addLetter(letter) { elem.innerHTML += letter; } },
    ];

    return addLetterObj.filter(obj => obj.target === target)[0].addLetter;
};


const getTabLetter = (elem, target, content) => {
    let TabLetterObj = [
	{target: "placeholder", func(){
	    let text = content || elem.getAttribute(this.target);
	    if (content == null)
		elem.setAttribute("placeholder", "");
	    return text;
	}},
	{target: "value", func(){
	    let text = content || elem.getAttribute(this.target); if (content == null) elem.setAttribute("value", "");
	    if (content == null)
		elem.setAttribute("value", "");
	    return text;
	}},
	{target: "html", func(){
	    let text = content || elem.innerHTML;
	    if (content == null)
		elem.innerHTML = "";
	    return text;
	}}
    ];

    let choosenObj = TabLetterObj.filter(obj => obj.target === target)[0];
    return choosenObj.func().split('');
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
    callback = (typeof(callback) === "function") ? callback : () => null;

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
    let optTab = [
	{target: "placeholder", removeLetter(letter) { elem.setAttribute(this.target, elem.getAttribute(this.target).slice(0,-1)); } },
	{target: "value", removeLetter(letter) { elem.setAttribute(this.target, elem.getAttribute(this.target).slice(0,-1)); } },
	{target: "html", removeLetter(letter) { elem.innerHTML = elem.innerHTML.toString().slice(0,-1); } }
    ];

    return optTab.filter(opt => opt.target === target)[0].removeLetter;
}

function getTextLength(elem, target) {
    let optTab = [
	{target: "placeholder", value: elem.getAttribute("placeholder").length },
	{target: "value", value: elem.getAttribute("value")},
	{target: "html", value: elem.innerHTML.length }
    ];

    return optTab.filter(opt => opt.target === target)[0].value;;
}
