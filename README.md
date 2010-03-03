# Blog Shortcuts

Author: Matt Jacobs  
License: TBD

## Overview

Blog Shortcuts will provide visitors of your blog the ability to navigate your site with their keyboard.

## Requirements

* jQuery 1.32 or higher
* A blog

## Usage

Currently, you'll need to modify the jQuery selectors to match the elements used in your HTML. For instance, when navigating between blog posts, the default selector is set to `$('.articles')`. If your posts all have the class `blog-posts`, you'll want to change the code to `$('.blog-posts')`.

## Available Shortcuts

These are the shortcuts that are included. Keep in mind, they are case-sensitive

* Scroll to the next entry: n or j
* Scroll to the previous entry: o or k
* Load the newer entry on permalink: J or N
* Load the older entry on permalink: K or P
* Go to the homepage: H
* Go to reviews: r
* Go to archives: A
* Go to about: a
* Focus on search: s
* Go to top: t
* Show the tag input window: g+t

## See it in action

Right now, the only place it's in use is on my blog. You can see it at [capndesign.com](http://capndesign.com).

## TODO

* Set jQuery selectors via variables
* Set keyboard commands via variables
* Allow character labels instead of character codes
* Figure out open-source license
* Get people to help optimize the JS; it needs work