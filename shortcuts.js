/* 
* Blog Shortcuts are developed by Matt Jacobs
* They will eventually be open sourced, once I figure that out.
*/

var keyIndex = 0;
var keyPresses = 0;
var items = $('.article').length;
var lastCode = '';
var activeUrl = '';
var clearT = false;

$(document).ready(function(){

	$('html').keypress(function(event){
		
		// Prevent keypresses from interupting form submissions
		if (document.activeElement.localName.toLowerCase() != 'input' && document.activeElement.localName.toLowerCase() != 'textarea') {
			keyPresses++;

			// Scroll to the next entry: n or j
			if ((event.charCode == '106' || event.charCode == '110') && !$('body.entry').html()) { 
				keyIndex++;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= items) keyIndex = items - 1;
				var articlePos = $($('.article').get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top -10);
				activeUrl = $($('.article').get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Scroll to the previous entry: o or k
			if ((event.charCode == '107' || event.charCode == '112') && !$('body.entry').html()) {

				keyIndex--;
				if (keyIndex < 0 || keyPresses == 1) keyIndex = 0;
				if (keyIndex >= items) keyIndex = items - 1;
				var articlePos = $($('.article').get(keyIndex)).offset();
				$(window).scrollTop(articlePos.top -10);
				activeUrl = $($('.article').get(keyIndex)).children().children('a.permalink').attr('href');
			}

			// Go to Entry
			if (event.keyCode == '13' && activeUrl != '') {
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