# [jQuery Fluid Content Scroller](http://orange35.com/jquery-fluid-content-scroller)

## Plugin Description 

jQuery Fluid Сontent Scroller Plugin makes navigation through long item lists
like news, events, blog posts, etc. smooth and easy. Plugin is represented with
the tabbed navigation panel at the top and at the bottom of the page / list
container allowing to instantly scroll up and down to a particular post on the
list.

* Contributor: [Orange35](http://orange35.com/ "Orange35 Web Development")
* Requires: jQuery 1.4.2+ or jQuery 2.x
* Tested up to: jQuery 1.10.2 and jQuery 2.0.3
* Stable tag: 1.0.0
* License: [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/) 

## Installation
1. Copy files to your website directory
2. Make sure you have jQuery (see requirements above) loaded
3. Add plugin stylesheet and script to page (see example below)
4. Initialise the plugin

### Plugin Initialization
```
<link rel="stylesheet" href="css/jquery.fluidContentScroller.css"/>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.fluidContentScroller.js"></script>
```

#### [Example of the Full Screen mode with default behaviour plugin initialization](examples/full-screen.html)
[View Demo](http://demo.orange35.com/jquery.fluidContentScroller/)
```
$("#content").find("> .post").fluidContentScroller();
```

#### [Example of the Custom Container with custom navigation tab labels plugin initialization](examples/custom-container.html)
[View Demo](http://demo.orange35.com/jquery.fluidContentScroller/custom-container)
```
$('#scroll-content').find("> .post").fluidContentScroller({
    container: '#scroll-content',
    navItem: {
        title: '[data-cs-title]'
    }
});
```

#### [Example of the Custom Container with Twitter Bootstrap tootips plugin initialization](examples/twitter-bootstrap.html)
[View Demo](http://demo.orange35.com/jquery.fluidContentScroller/twitter-bootstrap)
```
$(function () {
    var tipCallback = function () {
        return $('h2:first', $(this).data('csTarget')).text();
    };
    $(".demo-item").fluidContentScroller({
        container: '#scroll-content',
        onInit: function (target, top, bottom) {
            top.find('li').tooltip({ title: tipCallback, container: 'body' });
            bottom.find('li').tooltip({ title: tipCallback, container: 'body' });
        },
        navItem: {
            onBeforeClick: function (link) {
                link.tooltip('hide');
            }
        }
    });
});
```

### Available Options

You can pass these options as key/value object to fluidContentScroller() method.  
It is also possible to modify defaults directly at $.fn.fluidContentScroller.defaults.

**Name**                    | **Description**
---                         | ---
**container**               | Scrollable container for navigation<br>Type: *{undefined&#124;String&#124;HtmlElement&#124;jQuery}*<br>Default: `document.body`
**autoWrap**                | Adds wrapper around container, can be used only when container is not `document.body`<br>Type: *{Boolean}*<br> Default: `true`
**scrollSpeed**             | Duration of container scroll after click on navigation item<br>Type: *{Number}*<br>Default: 750
**scrollEasing**            | Container scroll easing<br>Type: *{undefined&#124;Number}*<br>Default: `undefined`
**onInit**                  | Called after plugin initialization and navigation build<br>Type: *{Function}*<br>Params: *{jQuery} target, {jQuery} topNav, {jQuery} bottomNav*<br>Default: `undefined`
**nav.className**           | Class name that added to top and bottom navigation bars <br>Type: *{String}*<br>Default: `'cs-nav'`
**nav.topClass**            | Class name of top navigation bar <br>Type: *{String}*<br>Default: `'cs-top'`
**nav.bottomClass**         | Class name of bottom navigation bar <br>Type: *{String}*<br>Default: `'cs-bottom'`
**nav.wrapClass**           | Class name of content wrapper (added when autoWrap = true) <br>Type: *{String}*<br>Default: `'cs-wrap'`
**nav.showEffect**          | Navigation show effect, can be used only when container is not 'body' <br>Type: *{undefined&#124;String&#124;Object}*<br>Default: `undefined`
**nav.hideEffect**          | Navigation hide effect, can be used only when container is not 'body' <br>Type: *{undefined&#124;String&#124;Object}*<br>Default: `undefined`
**nav.duration**            | Duration of navigation bar show/hide animation<br>Type: *{Number}*<br> Default: `400`
**navItem.title**           | Source for navigation item title ex. "[data-cs-title]" <br>Type: *{undefined&#124;String&#124;Function}*<br>Default: `undefined`
**navItem.showEffect**      | Show Effect Callback <br>Type: *{Function}*<br>Default: `$.fn.fadeIn`
**navItem.hideEffect**      | Show Effect Callback <br>Type: *{Function}*<br>Default: `$.fn.fadeOut`
**navItem.duration**        | Items show/hide effect duration<br>Type: *{Number}*<br>Default: `200`
**navItem.effectInterval**  | Interval between item show/hide effects<br>Type: *{Number}*<br>Default: `25`
**onBeforeClick**           | Calls before navigation item click animation<br>Type: *{undefined&#124;Function}*<br>Params: *{jQuery} link, {jQuery} target*<br>Default: `undefined`
**onAfterClick**            | Calls after navigation item click animation<br>Type: *{undefined&#124;Function}*<br>Params: *{jQuery} link, {jQuery} target*<br>Default: `undefined`


## Changelog
### 1.0.0
* Initial Public Release

## Bug Reporting/Feature Request
Would like to report a bug or request a new feature? Feel free to [create a new issue](https://github.com/orange35/jquery.fluidContentScroller/issues) for that purpose.

##Credits
Plugin is created and maintained by [Orange35](http://orange35.com/ "Orange35 Web Development")

## Copyright &amp; License
Copyright &copy; 2013 Orange35<br />
[Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](LICENSE)
