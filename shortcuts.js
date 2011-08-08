/* 
* Blog Shortcuts are developed by Matt Jacobs
* This will eventually be open sourced, once I figure that out.
*/

/***** Configurable *****/

/* Selector for Blog Post */

var blogPostSelector = '.article';
var nextPost = 'j';
var prevPost = 'k';
var goToPost = 'enter';

/***** Not so Configurable *****/

var keyIndex = 0;
var keyPresses = 0;
var bsItems, lastCode, activeUrl;
var clearT = false;

/* I borrowed these key codes from jKey
More infomation on http://oscargodson.com/labs/jkey */

var keyCodes = { 
	/* start the a-z keys */
	'a' : 65,
	'b' : 66,
	'c' : 67,
	'd' : 68,
	'e' : 69,
	'f' : 70,
	'g' : 71,
	'h' : 72,
	'i' : 73,
	'j' : 74,
	'k' : 75,
	'l' : 76,
	'm' : 77,
	'n' : 78,
	'o' : 79,
	'p' : 80,
	'q' : 81,
	'r' : 82,
	's' : 83,
	't' : 84,
	'u' : 85,
	'v' : 86,
	'w' : 87,
	'x' : 88,
	'y' : 89,
	'z' : 90,
	/* start number keys */
	'0' : 48,
	'1' : 49,
	'2' : 50,
	'3' : 51,
	'4' : 52,
	'5' : 53,
	'6' : 54,
	'7' : 55,
	'8' : 56,
	'9' : 57,
	/* start the f keys */
	'f1' : 112,
	'f2' : 113,
	'f3' : 114,
	'f4' : 115,
	'f5' : 116,
	'f6' : 117,
	'f7' : 118,
	'f8' : 119,
	'f9' : 120,
	'f10': 121,
	'f11': 122,
	'f12': 123,
	/* start the modifier keys */
	'shift' : 16,
	'ctrl' : 17,
	'control' : 17,
	'alt' : 18,
	'option' : 18, //Mac OS key
	'opt' : 18, //Mac OS key
	'cmd' : 224, //Mac OS key
	'command' : 224, //Mac OS key
	'fn' : 255, //tested on Lenovo ThinkPad
	'function' : 255, //tested on Lenovo ThinkPad
	/* Misc. Keys */
	'backspace' : 8,
	'osxdelete' : 8, //Mac OS version of backspace
	'enter' : 13,
	'return' : 13, //Mac OS version of "enter"
	'space':32,
	'spacebar':32,
	'esc':27,
	'escape':27,
	'tab':9,
	'capslock':20,
	'capslk':20,
	'super':91,
	'windows':91,
	'insert':45,
	'delete':46, //NOT THE OS X DELETE KEY!
	'home':36,
	'end':35,
	'pgup':33,
	'pageup':33,
	'pgdn':34,
	'pagedown':34,
	/* Arrow keys */
	'left' : 37,
	'up'   : 38,
	'right': 39,
	'down' : 40,
	/* Special char keys */
	'`':96,
	'~':96,
	'-':45,
	'_':45,
	'=':187,
	'+':187,
	'[':219,
	'{':219,
	']':221,
	'}':221,
	'\\':220, //it's actually a \ but there's two to escape the original
	'|':220,
	';':59,
	':':59,
	"'":222,
	'"':222,
	',':188,
	'<':188,
	'.':190,
	'>':190,
	'/':191,
	'?':191
};


$(document).ready(function(){

	/***** Not so Configurable *****/

	bsItems = $(blogPostSelector).length;

	$('html').keyup(function(event){
		
		// Prevent keypresses from interupting form submissions
		if (document.activeElement.localName.toLowerCase() != 'input' && document.activeElement.localName.toLowerCase() != 'textarea') {
			keyPresses++;

			// Scroll to the next entry
			if (event.keyCode == keyCodes[nextPost] && !$('body.entry').html()) { 
				keyIndex++;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= bsItems) keyIndex = bsItems - 1;
				var articlePos = $($(blogPostSelector).get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top - 10);
				activeUrl = $($(blogPostSelector).get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Scroll to the previous entry
			if (event.keyCode == keyCodes[prevPost] && !$('body.entry').html()) {

				keyIndex--;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= bsItems) keyIndex = bsItems - 1;
				var articlePos = $($(blogPostSelector).get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top - 10);
				activeUrl = $($(blogPostSelector).get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Go to Entry
			if (event.keyCode == keyCodes[goToPost] && activeUrl != '') {
				window.location = activeUrl
			}

			// Load the newer entry on permalink: J or N
			if ($('body').hasClass('entry') && $('a.right-nav').html() && (event.charCode == '78' || event.charCode == '74')) {
				window.location = $('a.right-nav').attr('href');
			}
			// Load the older entry on permalink: K or P
			if ($('body').hasClass('entry') && $('a.left-nav').html() && (event.charCode == '80' || event.charCode == '75')) {
				window.location = $('a.left-nav').attr('href');
			}

			// Go to the homepage: H
			if (event.charCode == '72') {
				window.location = '/';
			}
			// Go to reviews: r
			if (event.charCode == '114') {
				window.location = '/reviews';
			}

			// Go to archives: A
			if (event.charCode == '65') {
				window.location = '/archives';
			}

			// Go to about: a
			if (event.charCode == '97') {
				window.location = '/about';
			}
			// Focus on search: s
			if (event.charCode == '115') {
				$('#search').focus();
			}
		
			if (event.charCode == '116') {
				if (lastCode == '103') {
					// Show the tag input window: g+t

					$('body').append('<div id="goto-tag" class="shortcut-display"><form><label for="tag-input">Enter Tag: </label><input type="text" name="tag-input" id="tag-input" /></form></div>');
					$('#tag-input').focus();
				
					clickClear();
				
					clearT = true;
				
				} else {
					// Go to top: t

					$(window).scrollTop(0);
				}
			}
		
			if (event.charCode == '63') {
				$('body').append('<div id="shortcut-help" class="shortcut-display"><h3>Keyboard Shortcuts!</h3><ul><li>Scroll to the next entry: n or j</li> <li>Scroll to the previous entry: o or k</li> <li>Load the newer entry on permalink: J or N</li> <li>Load the older entry on permalink: K or P</li> <li>Go to the homepage: H</li> <li>Go to reviews: r</li> <li>Go to archives: A</li> <li>Go to about: a</li> <li>Focus on search: s</li> <li>Go to top: t</li> <li>Show the tag input window: g+t</li></ul></div>');
			
				clickClear();
			}
		
			lastCode = event.charCode;
		}
	
		// Clear tag or help window
		if (event.keyCode == '27') {
			$('.shortcut-display').remove();
		}
	
		if (clearT) {
			clearT = false;
			function clearTag() { $('#tag-input').val(''); }
			window.setTimeout(clearTag,10);
		}

	});

	$('html').keyup(function(event){
		// Clear tag or help window for Webkit
		if (event.keyCode == '27') {
			$('.shortcut-display').remove();
		}
	});

});