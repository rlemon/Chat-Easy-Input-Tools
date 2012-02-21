// ==UserScript==
// @name          SE Chat Easy Input tools
// @author        Robert Lemon
// @version       0.1.41
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
		insert_wrappers('_','_','italicized text');
	};

	var input_strikethrough = function() {
		insert_wrappers('---','---','strike-though text')
	};

	/* Run the page after the shortcut script finishes loading */
	var run = function() {
		shortcut.add('Alt+T', input_tag);
		shortcut.add('Alt+A', input_link);
		shortcut.add('Alt+B', input_bold);
		shortcut.add('Alt+I', input_italics);
		shortcut.add('Alt+S', input_strikethrough);
	};

	/* First load the shortcut script */
	var sc_script = document.createElement('script');
	sc_script.src = 'http://rlemon.com/public_files/shortcut.min.js'; // hopefully I will be able to find a better place to host this..... ;) ;)
	sc_script.onreadystatechange = function() {
		if (this.readyState == 'complete') run();
	}
	sc_script.onload = run;
	document.head.appendChild(sc_script);

});
