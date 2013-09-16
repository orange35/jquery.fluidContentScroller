# [jQuery Fluid Content Scroller](http://orange35.com/jquery.fluidContentScroller)

## Plugin Description jQuery Fluid Сontent Scroller Plugin makes navigation
through long item lists like news, events, blog posts, etc. smooth and easy.
Plugin is represented with the tabbed navigation panel at the top and at the
bottom of the page / list container allowing to instantly scroll up and down to
a particular post on the list.

* Contributor: [Orange35](http://orange35.com/ "Orange35 Web Development")
* Requires: jQuery 1.4.2+, jQuery 2.x
* Tested up to: 1.10.2, 2.0.3
* Stable tag: 1.0.0
* License: [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/) 

## Installation
1. Copy files to your website directory
2. Make sure you have jQuery (see requirements above) loaded
3. Add plugin stylesheet and script (мабуть треба зазначити куди їх додати?)
4. Start plugin initialization

### Plugin initialization
```
<link rel="stylesheet" href="css/jquery.fluidContentScroller.css"/>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.fluidContentScroller.js"></script>
```

#### Full screen with default behavior
```
$("#content").find("> .post").fluidContentScroller();
```

#### Custom scrollable container with custom title for navigation items
```
$('#scroll-content').find("> .post").fluidContentScroller({
    container: '#scroll-content',
    navItem: {
        title: '[data-cs-title]'
    }
});
```

#### Custom container and Tooltips with Twitter Bootstrap
```
var tipCallback = function () {
    return $('h2:first', $(this).data('csTarget')).text();
};
$('#scroll-content').find('.demo-item').fluidContentScroller({
    container: '#scroll-content',
    onInit: function (target, top, bottom) {
        top.find('li').tooltip({ title: tipCallback });
        bottom.find('li').tooltip({ title: tipCallback });
    }
});
```

#### Custom title with WordPress
```
var options = {
    navItem: {
        title: function (index, itemNode) {
            return $('.entry-date', itemNode).text();
        }
    }
};
if ($('#wpadminbar').length) {
    options.nav = options.nav || {};
    options.nav['topClass'] = 'cs-top-wpadmin';
}
$('#content > .post').fluidContentScroller(options);
```

## Bugs and feature requests
Have a bug or a feature request? [Please open a new issue](https://github.com/orange35/jquery.fluidContentScroller/issues).

## Copyright and license
Copyright 2013 Orange35, under [the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported license](LICENSE).
