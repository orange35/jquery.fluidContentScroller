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

#### Example of the Full Screen mode with default behaviour plugin inizialization
[View Demo](examples/full-screen.html)
```
$("#content").find("> .post").fluidContentScroller();
```

#### Example of the Custom Container with custom navigation tab labels plugin inizialization
[View Demo](examples/custom-container.html)
```
$('#scroll-content').find("> .post").fluidContentScroller({
    container: '#scroll-content',
    navItem: {
        title: '[data-cs-title]'
    }
});
```

#### Example of the Custom Container with Twitter Bootstrap tootips plugin inizialization
[View Demo](examples/twitter-bootstrap.html)
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
