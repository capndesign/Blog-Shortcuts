/* 
	Blog Shortcuts are developed by Matt Jacobs
	This will eventually be open sourced, once I figure that out.
*/

/* Please leave these fellows be (aka futz at your own risk). */

var keyIndex = 0;
var keyPresses = 0;
var bsItems, lastCode, activeUrl;
var clickCleared = false;
var clearT = false;
var bsOptions = {};

/*
	Configure me, please.
	All of the shortcuts already have keys and other variables set,
	but you'll have a lot more fun if you make it your own.
	
	A note: Don't use 'g'. I've reserved that for go-to commands.
*/

// Provide the CSS selector that is unique to your blog posts.
bsOptions.blogPostSelector = '.article';

// Keys for next and previous posts
bsOptions.nextPost = 'j';
bsOptions.prevPost = 'k';

// The key used to go to the permalink for the actively selected
// The permalink URL is configured in the code below. Mine was convoluted
// and I couldn't figure out a good way to bring it up here.
bsOptions.goToPost = 'enter';

// Keys for next and previous posts when on permalink pages
bsOptions.nextPermalink = 'n';
bsOptions.prevPermalink = 'p';

// Key to go to your homepage
bsOptions.goToHomepage = 'h';

// The URL of your homepage
bsOptions.homepageUrl = '/';

// Key to go to the top of the page
bsOptions.goToTop = 't';

// Key to go to your archives
bsOptions.goToArchives = 'r';

// The URL of your archives
bsOptions.archivesUrl = '/archives/';

// Key to go to your about page
bsOptions.goToAbout = 'a';

// The URL of your about page
bsOptions.aboutUrl = '/about/';

// The selector for your search box
bsOptions.searchSelector = '#search';

// Key to focus on search
bsOptions.focusSearch = 's';

// Enable go-to-tag box.
// I haven't generalized key sequences, so this is hard coded to g+t for now.
bsOptions.showTagBox = true;

// Show help box
// Note: I've defaulted to the question mark, which is problematic in Firefox.
bsOptions.help = '?';


/*
I borrowed these key codes from jKey
More infomation is available at http://oscargodson.com/labs/jkey
*/

var keyCodes = { 
	/* start the a-z keys */
	'a' : 65,
	'b' : 66,
	'c' : 67,
	'd' : 68,
	'e' : 69,
	'f' : 70,
	// 'g' : 71, *I've reserved g for go-to commands*
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

	bsItems = $(bsOptions.blogPostSelector).length;

	$('html').keyup(function(event){
		
		// Prevent keypresses from interupting form submissions
		if (document.activeElement.localName.toLowerCase() != 'input' && document.activeElement.localName.toLowerCase() != 'textarea') {
			keyPresses++;

			// Scroll to the next entry
			if (event.keyCode == keyCodes[bsOptions.nextPost] && !$('body.entry').html()) { 
				keyIndex++;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= bsItems) keyIndex = bsItems - 1;
				var articlePos = $($(bsOptions.blogPostSelector).get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top - 10);
				activeUrl = $($(bsOptions.blogPostSelector).get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Scroll to the previous entry
			if (event.keyCode == keyCodes[bsOptions.prevPost] && !$('body.entry').html()) {

				keyIndex--;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= bsItems) keyIndex = bsItems - 1;
				var articlePos = $($(bsOptions.blogPostSelector).get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top - 10);
				activeUrl = $($(bsOptions.blogPostSelector).get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Go to Entry
			if (event.keyCode == keyCodes[bsOptions.goToPost] && activeUrl != '') {
				window.location = activeUrl;
			}

			// Load the newer entry on permalink
			if ($('body').hasClass('entry') && $('a.right-nav').html() && event.keyCode == keyCodes[bsOptions.nextPermalink]) {
				window.location = $('a.right-nav').attr('href');
			}
			// Load the older entry on permalink
			if ($('body').hasClass('entry') && $('a.left-nav').html() && event.keyCode == keyCodes[bsOptions.prevPermalink]) {
				window.location = $('a.left-nav').attr('href');
			}

			// Go to the homepage
			if (bsOptions.homepageUrl && event.keyCode == keyCodes[bsOptions.goToHomepage]) {
				window.location = bsOptions.homepageUrl;
			}

			// Go to archives
			if (bsOptions.archivesUrl && event.keyCode == keyCodes[bsOptions.goToArchives]) {
				window.location = bsOptions.archivesUrl;
			}

			// Go to about
			if (bsOptions.homepageUrl && event.keyCode == keyCodes[bsOptions.goToAbout]) {
				window.location = bsOptions.aboutUrl;
			}
			// Focus on search
			if (bsOptions.searchSelector && event.keyCode == keyCodes[bsOptions.focusSearch]) {
				$(bsOptions.searchSelector).focus();
			}
		
			// Show the tag input window: g+t
			if (bsOptions.showTagBox && event.keyCode == '84' && lastCode == '71') {

				$('body').append('<div id="goto-tag" class="shortcut-display"><form><label for="tag-input">Enter Tag: </label><input type="text" name="tag-input" id="tag-input" /></form></div>');
				$('#tag-input').focus();
			
				clickClear();
				clearT = true;
			}
			
			// Go to top (we have to check that g wasn't pressed first while this is still hard coded)
			if (event.keyCode == keyCodes[bsOptions.goToTop] && lastCode != '71') {
				$(window).scrollTop(0);
			}
		
			if (event.keyCode == keyCodes[bsOptions.help]) {
				bsHelp = $('<div id="shortcut-help" class="shortcut-display"><h3>Keyboard Shortcuts!</h3><ul></ul></div>');
				
				if (bsOptions.nextPost) bsHelp.append('<li>Scroll to the next post: ' + bsOptions.nextPost + '</li>');
				if (bsOptions.prevPost) bsHelp.append('<li>Scroll to the previous post: ' + bsOptions.prevPost + '</li>');
				if (bsOptions.goToPost) bsHelp.append('<li>Load highlighted post: ' + bsOptions.goToPost + '</li>');
				if (bsOptions.nextPermalink) bsHelp.append('<li>On permalink, load newer post: ' + bsOptions.nextPermalink + '</li>');
				if (bsOptions.prevPermalink) bsHelp.append('<li>On permalink, load older post: ' + bsOptions.prevPermalink + '</li>');
				if (bsOptions.goToHomepage) bsHelp.append('<li>Go to the homepage: ' + bsOptions.goToHomepage + '</li>');
				if (bsOptions.goToTop) bsHelp.append('<li>Go to the top of the page: ' + bsOptions.goToTop + '</li>');
				if (bsOptions.goToArchives) bsHelp.append('<li>Go to archives: ' + bsOptions.goToArchives + '</li>');
				if (bsOptions.goToAbout) bsHelp.append('<li>Go to about page: ' + bsOptions.goToAbout + '</li>');
				if (bsOptions.focusSearch) bsHelp.append('<li>Focus on the search box: ' + bsOptions.focusSearch + '</li>');
				if (bsOptions.showTagBox) bsHelp.append('<li>Show the "Go to tag" box: g then t</li>');
				
				$('body').append(bsHelp);
				clickClear();
			}
		
			lastCode = event.keyCode;
		}
	
		// Clear tag or help window by pressing escape
		if (event.keyCode == '27') {
			$('.shortcut-display').remove();
		}

		// Wait until the box is gone before removing the value of the input box
		if (clearT) {
			clearT = false;
			window.setTimeout(clearTag,10);
		}

		// This is the event handler that submits the go-to-tag form
		$('#goto-tag form').live('submit', function(){
			window.location = '/tag/' + $('#tag-input').val();
			return false;
		});
		
	});

});

// We want to clear out the go-to-tag box if you hide it.
function clearTag() { $('#tag-input').val(''); }

// When a user clicks out of the tag or help box, hide it.
function clickClear() {
	if (!clickCleared) {
		$('*').click(function(e) {
			if (!$(e.target).parents().hasClass('.shortcut-display') && !$(e.target).hasClass('.shortcut-display')) {
				$('.shortcut-display').remove();
				clickCleared = true;
			}
		});
	}
}