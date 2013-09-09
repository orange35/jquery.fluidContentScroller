# [jquery.contentScroller](http://orange35.com/plugin/jquery.contentScroller)


## Usage
```
<link rel="stylesheet" href="css/jquery.contentScroller.css"/>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.contentScroller.js"></script>
```

Full screen with default behavior:
```
$("#content").find("> .post").contentScroller();
```

Custom scrollable container with custom title for navigation items:
```
$('#scroll-content').find("> .post").contentScroller({
    container: '#scroll-content',
    navItem: {
        title: '[data-cs-title]'
    }
});
```

Custom container and Tooltips with Twitter Bootstrap:
```
var tipCallback = function () {
    return $('h2:first', $(this).data('csTarget')).text();
};
$(".demo-item").contentScroller({
    container: '#scroll-content',
    onInit: function (target, top, bottom) {
        top.find('li').tooltip({ title: tipCallback });
        bottom.find('li').tooltip({ title: tipCallback });
    }
});
```

Custom title with WordPress:
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
