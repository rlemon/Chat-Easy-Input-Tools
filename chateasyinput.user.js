// ==UserScript==
// @name          SE Chat Easy Input tools
// @author        Robert Lemon 
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
	
	

	/* ALT + T handler 
	 * If focus is in the textarea AND NO selection range is set, insert the '[tag:]' at the caret position
	 * and move the caret just past the colon.
	 * If focus is in the textarea AND there is a selection range is set, wrap the range in '[tag:' + ']',
	 * and move the caret just past range end. deselect the range.
	 * If focus is not in the textarea do nothing.
	 * */
	var input_tag = function() {
		if ( in_input() ) {
			var selection = get_selection(), pre = get_pre(), post = get_post(), pos = 0, tag_open = '[tag:', tag_close = ']';
			if( selection ) {
				pre += tag_open + selection + tag_close;	
			} else {
				pre += tag_open;
				post = tag_close + post;
			}
			chat_input.value = pre + post;
			pos = pre.length;
			chat_input.setSelectionRange(pos, pos);
		}
	};
	
	/* ALT + A handler 
	 * If focus is in the textarea AND NO selection range is set, prompt for url. Insert the link at the caret position with the url and default text.
	 * select default text.
	 * If focus is in the textarea AND there is a selection range is set, prompt the user for a url to correspond to the link. replace the selection with the link
	 * and move the caret just past range end. deselect the range.
	 * If focus is not in the textarea do nothing.
	 * */
	var input_link = function() {
		if ( in_input() ) {
			var selection = get_selection(), pre = get_pre(), post = get_post(), pos_start = 0, pos_end = 0;
			var url = prompt('Enter a URL\nhttp://example.com/ "optional title"','http://');
			if( url === null ) return; // user hit cancel
			if( selection ) {
				pre += '[' + selection + '](' + url + ')';
				pos_start = pos_end = pre.length;
			} else {
				pos_start = pre.length + 1;
				pos_end = pos_start + 27; // probably a cheap way to do this.... 
				pre += '[enter link description here](' + url + ')';
			}
			chat_input.value = pre + post;
			chat_input.setSelectionRange(pos_start, pos_end);
		}
	};

	/* Run the page after the shortcut script finishes loading */
	var run = function() {
		shortcut.add('Alt+T', input_tag);
		shortcut.add('Alt+A', input_link);
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
