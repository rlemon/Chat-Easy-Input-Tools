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

	/* ALT + T handler 
	 * If focus is in the textarea insert the '[tag:]' at the caret position
	 * and move the caret just past the colon.
	 * If focus is not in the textarea insert the '[tag:]' at the end of the textarea
	 * and move the caret just past the colon.
	 * */
	var input_tag = function() {
		var pos = 0,
			TAG = '[tag:]';
		if (document.activeElement == chat_input) {
			var pre = chat_input.value.substring(0, chat_input.selectionStart) + TAG;
			var post = chat_input.value.substring(chat_input.selectionEnd, chat_input.value.length);
			chat_input.value = pre + post;
			pos = pre.length - 1;
		} else {
			chat_input.value = chat_input.value + TAG;
			pos = chat_input.value.length - 1;
		}
		chat_input.setSelectionRange(pos, pos);
	};

	/* Run the page after the shortcut script finishes loading */
	var run = function() {
		shortcut.add('Alt+T', input_tag);
	};

	/* First load the shortcut script */
	var sc_script = document.createElement('script');
	sc_script.src = 'http://rlemon.com/public_files/shortcut.min.js';
	sc_script.onreadystatechange = function() {
		if (this.readyState == 'complete') run();
	}
	sc_script.onload = run;
	document.head.appendChild(sc_script);

});
