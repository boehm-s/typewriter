Object.prototype.insertAfter = function (newNode) { this.parentNode.insertBefore(newNode, this.nextSibling); }

var Prompt = function(appendElem){
    this.initInterval;

    a = document.createElement('div');
    a.setAttribute('id','prompt');
    appendElem.insertAfter(a);
    this.self = document.getElementById('prompt');
};

Prompt.prototype.start = function(){
    self = this.self;
    i = 0;
    this.initInterval = setInterval(function(){
	self.style.display = (i%2 == 0) ? 'inline' : 'none';
        i++;
    }, 500);
};

Prompt.prototype.remove = function(){
    self = this.self;
    initInterval = this.initInterval;

    window.clearInterval(initInterval);
    self.parentNode.removeChild(self);
};

var Type = function(elem, textSpeed, aleaSpeed) {
    this.elem = elem;
    this.textSpeed = (textSpeed === undefined) ? 90 : textSpeed;
    this.aleaSpeed = (aleaSpeed === undefined) ? 50 : aleaSpeed;
    this.tabText;
    this.tabSpeed;


    text = this.elem.innerText, textSpeed = this.textSpeed, aleaSpeed = this.aleaSpeed;
    arrText = [], arrSpeed = [];
    for (i=0; i < text.length; i++) {
	arrText.push(text[i]);
	arrSpeed.push(Math.floor((Math.random() * aleaSpeed) + textSpeed));
    }
    this.tabText = arrText;
    this.tabSpeed = arrSpeed;
    this.elem.innerText = "";
    this.elem.style.display = "initial";
}

Type.prototype.start = function(callback){
    time = this.tabSpeed;
    text = this.tabText;
    elem = this.elem;
    i = 0;
    (function loop(){ 
	if (text[i] === '§')
	    elem.innerHTML = (i != 0) ? [elem.innerHTML, "<br/> >_"].join("") : [elem.innerHTML, ">_"].join("");
	else if (text[i] === '$')
	    elem.innerHTML = [elem.innerHTML, "<br/>"].join("");
	else
            elem.innerHTML = [elem.innerHTML, text[i]].join("");
        i++;
	
	if (text[i] === text[i-1])
            time[i]*= 0.8;

	((text[i+1]) ? setTimeout(loop, time[i]) : callback());
    })();
};

Type.prototype.remove = function(bool) {
    elem = this.elem;
    ((bool === true) ? elem.parentNode.removeChild(elem) : elem.innerHTML = "");
}

// Start here
var elem = document.getElementsByClassName('clavier')[0];
var f = new Type(elem, 90, 50);
var p = new Prompt(elem);

f.start(function(){
    p.start();
});


