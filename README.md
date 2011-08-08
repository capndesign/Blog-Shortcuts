# Blog Shortcuts

Author: Matt Jacobs  
License: TBD

## Overview

Blog Shortcuts provides visitors of your blog the ability to navigate your site with their keyboard.

## Requirements

* jQuery
* Safari 4.x, Firefox 3.6.x or Chrome 4.x
* A blog

## Usage

There are two files you'll need to include on your blog.

* blog-shortcuts.js: This is the meat of the application. You'll also do the majority of your configurations here.
* bs-styles.css: This provides a small set of styles for the help and tag interfaces.

The available shortcuts are listed below and you can configure the key commands for your shortcuts in `blog-shortcuts.js`. Here's some sample configuration:

	// Provide the CSS selector that is unique to your blog posts.
	bsOptions.blogPostSelector = '.article';

	// Keys for next and previous posts
	bsOptions.nextPost = 'j';
	bsOptions.prevPost = 'k';
	
	// Key to go to your homepage
	// bsOptions.goToHomepage = 'h';

	// The URL of your homepage
	bsOptions.homepageUrl = '/';

The inline comments should be enough for you to figure it out, but it's worth noting that commenting out any of the shortcuts will keep it from firing (and out of the help menu).

### Some usage notes

* Don't use 'g'. I've reserved that for go-to commands.
* As such, the "go to tag" command is hard-coded to `g then t`.
* The "go to post" command is a bit customized for me. It definitely works, but it's not as automatic as I'd like.

## Available Shortcuts

These are the shortcuts that are included.

* Scroll to the next entry
* Scroll to the previous entry
* Load the newer entry on permalink
* Load the older entry on permalink
* Go to the homepage
* Go to reviews
* Go to archives
* Go to about
* Focus on search
* Go to top
* Show the tag input window (hardcoded to "g then t" for now)
* Help menu (which shows all available shortcuts)

## See it in action

Right now, the only place it's in use is on my blog. You can see it at [capndesign.com](http://capndesign.com).

## TODO

* <strike>Set jQuery selectors via variables</strike>
* <strike>Set keyboard commands via variables</strike>
* <strike>Allow character labels instead of character codes</strike>
* Figure out open-source license
* Test in IE 7/8, then make it work there
* Get people to help optimize the JS; it could be better