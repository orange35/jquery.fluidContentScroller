# [jquery.contentScroller](http://orange35.com/jquery.contentScroller)


## Usage
 * [download](https://github.com/orange35/jquery.contentScroller/archive/master.zip) the plugin,
 * unzip it and copy files to your website directory,
 * make sure that you have load jQuery (plugin requires jQuery 1.4.2+, or jQuery 2.x),
 * include plugin stylesheet and script,
 * initialize plugin.

### Plugin initialization
```
<link rel="stylesheet" href="css/jquery.contentScroller.css"/>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.contentScroller.js"></script>
```

#### Full screen with default behavior
```
$("#content").find("> .post").contentScroller();
```

#### Custom scrollable container with custom title for navigation items
```
$('#scroll-content').find("> .post").contentScroller({
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
$('#scroll-content').find('.demo-item').contentScroller({
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
$('#content > .post').contentScroller(options);
```

## Bugs and feature requests
Have a bug or a feature request? [Please open a new issue](https://github.com/orange35/jquery.contentScroller/issues).

## Copyright and license
Copyright 2013 Orange35, under [the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported license](LICENSE).
