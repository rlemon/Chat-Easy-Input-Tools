// ==UserScript==
// @name          SE Chat Easy Input tools
// @author        Robert Lemon
// @version       0.1.50
// @namespace     http://rlemon.com
// @description   Adds keyboard shortcuts to the SE Chats
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==

/* Embed code on page */
function EmbedCodeOnPage(type, kode) {
	var elm = document.createElement(type);
	elm.textContent = kode;
	document.head.appendChild(elm);
}

/* Embed code on page and execute */
function EmbedFunctionOnPageAndExecute(fn) {
	EmbedCodeOnPage("script", "(" + fn.toString() + ")()");
}

/* Main */
EmbedFunctionOnPageAndExecute(function() {
	
	/* Chat Input Textarea */
	var chat_input = document.getElementById('input');

	/* utility functions */
	var get_selection = function() {
		return chat_input.value.substring( chat_input.selectionStart, chat_input.selectionEnd );
	}
	var get_pre = function() {
		return chat_input.value.substring(0, chat_input.selectionStart);
	}
	var get_post = function() {
		return chat_input.value.substring(chat_input.selectionEnd, chat_input.value.length);
	}
	var in_input = function() {
		return document.activeElement === chat_input;
	}
	
	var insert_wrappers = function(wrapper_open, wrapper_close, default_message) {
		if( in_input() ) {
			var selection = get_selection() || default_message, pre = get_pre(), post = get_post(), pos_start = 0, pos_end = 0;
			pos_start = pre.length + wrapper_open.length;
			pos_end = pos_start + selection.length;
			pre += wrapper_open + selection + wrapper_close;
			chat_input.value = pre + post;
			chat_input.setSelectionRange(pos_start, pos_end);
		}
	}
	
	var input_link = function() {
		if ( in_input() ) { // doubled i know. but we don't want to prompt otherwise. 
			var url = prompt('Enter a URL\nhttp://example.com/ "optional title"','http://');
			if( url === null ) return; // user hit cancel
			insert_wrappers('[', '](' + url + ')', 'enter link description here');
		}
	};
	
	var input_tag = function() {
		insert_wrappers('[tag:',']','tag-text');
	};

	var input_bold = function() {
		insert_wrappers('**','**','strong text');
	};

	var input_italics = function() {
		insert_wrappers('*','*','italicized text');
	};

	var input_strikethrough = function() {
		insert_wrappers('---','---','strike-though text');
	};
	
	var input_code = function() { // UX needs to be considered.. single line vs multi-line input. format code / fixed font.
		insert_wrappers('`','`','formatted code');
	};
    
    var input_tag_update = function() {
		insert_wrappers('[tag:',']','tl-dr-update');
	};

    var input_emote = function() {
        insert_wrappers('*:', ':*', 'emote');
    }
/* Minified Shortcut script - avoids loading external resources. */

shortcut={all_shortcuts:{},add:function(e,g,a){var c={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(a)for(var f in c)"undefined"==typeof a[f]&&(a[f]=c[f]);else a=c;c=a.target;"string"==typeof a.target&&(c=document.getElementById(a.target));e=e.toLowerCase();f=function(b){b=b||window.event;if(a.disable_in_input){var d;b.target?d=b.target:b.srcElement&&(d=b.srcElement);3==d.nodeType&&(d=d.parentNode);if("INPUT"==d.tagName||"TEXTAREA"==d.tagName)return}b.keyCode?code=
b.keyCode:b.which&&(code=b.which);d=String.fromCharCode(code).toLowerCase();188==code&&(d=",");190==code&&(d=".");var c=e.split("+"),h=0,f={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},s={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,
end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},j=!1,l=!1,m=!1,n=!1,o=!1,p=!1,q=!1,r=!1;b.ctrlKey&&(n=!0);b.shiftKey&&(l=!0);b.altKey&&(p=!0);b.metaKey&&(r=!0);for(var i=0;k=c[i],i<c.length;i++)"ctrl"==k||"control"==k?(h++,m=!0):"shift"==k?(h++,j=!0):"alt"==k?(h++,o=!0):"meta"==k?(h++,q=!0):1<k.length?s[k]==code&&h++:a.keycode?a.keycode==code&&h++:d==k?h++:f[d]&&
b.shiftKey&&(d=f[d],d==k&&h++);if(h==c.length&&n==m&&l==j&&p==o&&r==q&&(g(b),!a.propagate))return b.cancelBubble=!0,b.returnValue=!1,b.stopPropagation&&(b.stopPropagation(),b.preventDefault()),!1};this.all_shortcuts[e]={callback:f,target:c,event:a.type};c.addEventListener?c.addEventListener(a.type,f,!1):c.attachEvent?c.attachEvent("on"+a.type,f):c["on"+a.type]=f},remove:function(e){var e=e.toLowerCase(),g=this.all_shortcuts[e];delete this.all_shortcuts[e];if(g){var e=g.event,a=g.target,g=g.callback;
a.detachEvent?a.detachEvent("on"+e,g):a.removeEventListener?a.removeEventListener(e,g,!1):a["on"+e]=!1}}};

/* End shortcut script */

shortcut.add('Alt+T', input_tag);
shortcut.add('Alt+A', input_link);
shortcut.add('Alt+B', input_bold);
shortcut.add('Alt+I', input_italics);
shortcut.add('Alt+S', input_strikethrough);
shortcut.add('Alt+C', input_code);
shortcut.add('Alt+U', input_tag_update);
shortcut.add('Alt+E', input_emote);

});
