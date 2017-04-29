/*!
 * jquery.fluidContentScroller
 *
 * @version 1.0.2
 * @requires jQuery 1.4.2+
 * @copyright Orange35.com, 2013
 * @license Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
!(($ => {
    "use strict";

    var FluidContentScroller = function (element, options) {
        this.$target = $(element);
        if (this.$target.length === 0) {
            return this;
        }

        this.eventNS = 'contentSlider';
        this.options = $.extend(true, {}, $.fn.fluidContentScroller.defaults, options);
        /** @type {jQuery} */
        this.$container = $(this.options.container || 'body');
        /** @type {jQuery} */
        this.$scrollContainer = ('scroll' === this.$container.css('overflow-y')) ? this.$container : $(window);

        this.options.autoWrap = (this.options.autoWrap && document.body !== this.$container[0]);

        this.scrollTimer = null;
        this.resizeTimer = null;
        this.navItemTimer = {top: {show: undefined, hide: undefined}, bottom: {show: undefined, hide: undefined}};

        /** @type {Array} [{
         *     top: Number,
         *     $topNode: jQuery,
         *     $bottomNode: jQuery,
         *     topNodeWidth: Number,
         *     bottomNodeWidth: Number,
         * }, ...] */
        this.navItems = [];

        // chrome fix for blinking navigation than refreshing scrolled page
        setTimeout(this.proxy(this.init, this), 0);
        return this;
    };

    FluidContentScroller.prototype = {
        reAttr: /\[([a-z0-9_\-]+)\]/i,

        init() {
            this.initNavigation();

            $(window).bind('resize.' + this.eventNS, this.proxy(this.onResize, this));
            this.$scrollContainer.bind('scroll.' + this.eventNS, this.proxy(this.onScroll, this));

            if ('function' === typeof this.options.onInit) {
                this.options.onInit.call(null, this.$target, this.$topNav, this.$bottomNav);
            }
            return this;
        },

        initNavigation() {
            var i;
            var c;
            var title;
            var info;
            var $topItem;
            var $bottomItem;
            var onNavItemClick;
            var $target;

            this.$topNav = $('<ul />').addClass(this.options.nav.className).addClass(this.options.nav.topClass);
            this.$bottomNav = $('<ul />').addClass(this.options.nav.className).addClass(this.options.nav.bottomClass);

            this.navItems.length = this.$target.length;
            for (i = 0, c = this.$target.length; i < c; ++i) {
                $target = $(this.$target[i]);
                if (null == this.options.navItem.title
                        || null == (title = this.getInfo(i, $target, this.options.navItem.title))) {
                    title = i + 1;
                }
                $topItem = $('<li><a href="#">' + title + '</a></li>').hide();
                $bottomItem = $topItem.clone();
                $topItem.data('csIndex', i).data('csTarget', $target);
                $bottomItem.data('csIndex', i).data('csTarget', $target);

                this.navItems[i] = {
                    top: undefined,
                    $topNode: $topItem,
                    $bottomNode: $bottomItem,
                    topNodeWidth: null,
                    bottomNodeWidth: null
                };

                this.$topNav.append($topItem);
                this.$bottomNav.append($bottomItem);
            }

            if (this.options.autoWrap) {
                this.contentWrap = $('<div />').addClass(this.options.nav.wrapClass);
                this.contentWrap
                    .insertBefore(this.$container)
                    .append(this.$topNav)
                    .append(this.$container)
                    .append(this.$bottomNav);
            } else {
                this.$topNav.prependTo(this.$container);
                this.$bottomNav.appendTo(this.$container);
            }

            for (i = 0, c = this.$target.length; i < c; ++i) {
                info = this.navItems[i];
                info.topNodeWidth = info.$topNode.outerWidth(true);
                info.bottomNodeWidth = info.$bottomNode.outerWidth(true);
            }

            onNavItemClick = this.proxy(this.onNavItemClick, this);
            this.$topNav.find('li').bind('click.' + this.eventNS, onNavItemClick);
            this.$bottomNav.find('li').bind('click.' + this.eventNS, onNavItemClick);

            this.$topNav.hide();
            this.$bottomNav.hide();
            this.refreshPositions();
            return this;
        },

        onResize() {
            if (this.resizeTimer) { clearTimeout(this.resizeTimer); }
            this.resizeTimer = setTimeout(this.proxy(this.refreshPositions, this), 100);
        },

        refreshPositions() {
            var i;
            var c;
            var containerWidth = this.$container.get(0).clientWidth;

            var containerOffset = (window === this.$scrollContainer[0])
                ? 0
                : this.$scrollContainer.offset().top - this.$scrollContainer.scrollTop();

            this.$topNav.css({width: containerWidth});
            this.$bottomNav.css({width: containerWidth});

            for (i = 0, c = this.$target.length; i < c; ++i) {
                this.navItems[i].top = $(this.$target[i]).offset().top - containerOffset;
            }
            this.updateNavigation();
            return this;
        },

        clearNavItemTimer(toolbars, actions) {
            var i;
            var j;
            var toolbar;
            var action;
            toolbars = toolbars || ['top', 'bottom'];
            actions = actions || ['show', 'hide'];
            toolbars = $.isArray(toolbars) ? toolbars : [toolbars];
            actions = $.isArray(actions) ? actions : [actions];
            for (i = 0; i < toolbars.length; i++) {
                toolbar = toolbars[i];
                for (j = 0; j < toolbars.length; j++) {
                    action = actions[j];
                    if (this.navItemTimer[toolbar][action]) {
                        clearTimeout(this.navItemTimer[toolbar][action]);
                        this.navItemTimer[toolbar][action] = null;
                    }
                }
            }
        },

        onScroll() {
            this.clearNavItemTimer();
            if (this.scrollTimer) { clearTimeout(this.scrollTimer); }
            this.scrollTimer = setTimeout(this.proxy(this.updateNavigation, this), 100);
        },

        updateNavigation() {
            var that = this;
            var viewTop;
            var viewBottom;
            var maxTopWidth = this.$topNav.width();
            var maxBottomWidth = this.$bottomNav.width();
            var topWidth = 0;
            var bottomWidth = 0;
            var topShow = [];
            var topShowL = [];
            var topShowR = [];
            var topHideL = [];
            var topHideR = [];
            var bottomShow = [];
            var bottomShowL = [];
            var bottomShowR = [];
            var bottomHideL = [];
            var bottomHideR = [];
            var topShowWidth = [];
            var bottomShowWidth = [];
            var list;
            var reverse;
            var i;
            var c;
            var info;

            viewTop = this.$scrollContainer.scrollTop();
            viewBottom = viewTop
                + (window === this.$scrollContainer[0]
                    ? document.documentElement.clientHeight
                    : this.$scrollContainer.innerHeight());

            // viewport corrections then nav bars are visible,
            // but hide navigation then all headers are behind navigation bar
            if (this.$topNav.is(':visible') && this.navItems[0].top < viewTop) {
                viewTop += this.$topNav.outerHeight();
            }
            if (this.$bottomNav.is(':visible') && this.navItems[this.navItems.length - 1].top > viewBottom) {
                viewBottom -= this.$bottomNav.outerHeight();
            }

            // calculate all visible and hidden nav items
            for (i = 0, c = this.$target.length; i < c; ++i) {
                info = this.navItems[i];

                if (info.top < viewTop) {
                    topShow.push(info.$topNode[0]);
                    topShowWidth.push(info.topNodeWidth);
                    topWidth += info.topNodeWidth;
                    while (topWidth >= maxTopWidth && topShow.length) {
                        topWidth -= topShowWidth[0];
                        topHideL.unshift(topShow[0]);
                        topShow.shift();
                        topShowWidth.shift();
                    }
                } else {
                    topHideR.push(info.$topNode[0]);
                }

                if (info.top > viewBottom) {
                    bottomShow.push(info.$bottomNode[0]);
                    bottomShowWidth.push(info.bottomNodeWidth);
                    bottomWidth += info.bottomNodeWidth;
                    while (bottomWidth >= maxBottomWidth && bottomShow.length) {
                        bottomWidth -= bottomShowWidth[bottomShowWidth.length - 1];
                        bottomHideR.push(bottomShow[bottomShow.length - 1]);
                        bottomShow.pop();
                        bottomShowWidth.pop();
                    }
                } else {
                    bottomHideL.push(info.$bottomNode[0]);
                }
            }


            // split top visible nav items in to left and right
            list = topShowL;
            reverse = false;
            for (i = 0, c = topShow.length; i < c; ++i) {
                if ($(topShow[i]).is(':visible')) {
                    list = topShowR;
                    reverse = true;
                } else {
                    list.push(topShow[i]);
                }
            }
            topShowL = reverse ? topShowL.reverse() : topShowL;
            topHideR = topHideR.reverse();

            // split bottom visible nav items in to left and right
            list = bottomShowL;
            reverse = false;
            for (i = 0, c = bottomShow.length; i < c; ++i) {
                if ($(bottomShow[i]).is(':visible')) {
                    list = bottomShowR;
                    reverse = true;
                } else {
                    list.push(bottomShow[i]);
                }
            }
            bottomShowL = reverse ? bottomShowL.reverse() : bottomShowL;
            bottomHideR = bottomHideR.reverse();

            // top nav bar animation
            $(topHideL).hide();
            this.toggleNavItems(topHideR, false, () => {
                that.toggleNavItems(topShowL, true);
                that.toggleNavItems(topShowR, true);
            });

            // bottom nav bar animation
            this.toggleNavItems(bottomHideL, false, () => {
                $(bottomHideR).hide();
                that.toggleNavItems(bottomShowL, true);
                that.toggleNavItems(bottomShowR, true);
            });


            // show/hide nav bars
            this.toggleNav(this.$topNav, topShow.length > 0);
            this.toggleNav(this.$bottomNav, bottomShow.length > 0);
            return this;
        },

        toggleNav(container, show) {
            var effect = show ? this.options.nav.showEffect : this.options.nav.hideEffect;
            var effectFn = show ? container.show : container.hide;

            if (!$.isPlainObject(effect) && typeof effect !== 'string') {
                effectFn = show ? container.fadeIn : container.fadeOut;
                effect = this.options.nav.duration;
            }
            effectFn.call(container, effect);
        },

        toggleNavItems(items, show, callback) {
            if (items.length) {
                items = $(items).filter(show ? ':hidden' : ':visible').toArray();
                this.toggleNavItem(items, show, this.options.navItem.duration, callback);
            } else {
                if (callback) { callback.call(); }
            }
        },

        toggleNavItem(items, show, duration, callback) {
            var item;
            var toolbar;
            var action = show ? 'show' : 'hide';
            var effectFn = show ? this.options.navItem.showEffect : this.options.navItem.hideEffect;

            items = items.slice(0);
            if ((item = items.shift())) {
                effectFn.call($(item), duration);
            }
            if (items.length) {
                toolbar = this.getItemToolbarName(item);
                this.clearNavItemTimer(toolbar, action);

                this.navItemTimer[toolbar][action] = setTimeout(
                    this.proxy(this.toggleNavItem, this, items, show, duration, callback),
                    this.options.navItem.effectInterval
                );
            } else {
                if (callback) { callback.call(); }
            }
        },

        getItemToolbarName(item) {
            return $(item).parents('.' + this.options.nav.className + ':first')
                          .hasClass(this.options.nav.topClass) ? 'top' : 'bottom';
        },

        onNavItemClick(e) {
            e.preventDefault();
            var link = $(e.currentTarget);
            var index = parseInt(link.data('csIndex'));
            var $container;
            var $target;
            var position;
            var positionOffset = 0;
            var scrollTop = 0;
            var onComplete;

            if ('function' === typeof this.options.navItem.onBeforeClick) {
                this.options.navItem.onBeforeClick.call(null, link, $(this.$target[index]));
            }

            onComplete = ('function' === typeof this.options.navItem.onAfterClick) ? (((fn, link, target) => () => { fn.call(null, link, target); }))(this.options.navItem.onAfterClick, link, $(this.$target[index])) : undefined;

            if (index in this.$target) {
                if ((window === this.$scrollContainer[0])) {
                    $container = $('html, body');
                } else {
                    $container = this.$scrollContainer;
                    scrollTop = $container.scrollTop();
                }
                positionOffset = -this.$topNav.outerHeight();
                $target = $(this.$target[index]);
                position = $target.offset().top - $container.offset().top + scrollTop + positionOffset;
                $container.animate({
                    scrollTop: position
                }, this.options.scrollSpeed, this.options.scrollEasing, onComplete);
            }
        },

        getInfo(index, $itemNode, info) {
            var container;
            var match;
            if (undefined === info) {
                return undefined;
            }
            if ('function' === typeof info) {
                return info(index, $itemNode);
            }
            container = $itemNode;
            if (!container.is(info)) {
                container = $itemNode.find(info);
            }
            if (container.length) {
                match = info.match(this.reAttr);
                return (match) ? container.attr(match[1]) : container.text();
            }
            return undefined;
        },

        proxy(fn, context) {
            var bind = Function.prototype.bind;
            var slice = Array.prototype.slice;
            var args;
            if (fn.bind === bind && bind) {
                return bind.apply(fn, slice.call(arguments, 1));
            }
            args = slice.call(arguments, 2);
            return function() {
                return fn.apply(context, args.concat(slice.call(arguments)));
            };
        }

    };

    /**
     * Selector defines set of elements with need to be scrolled ex. "#content > .post"
     * @param {Object} [options]
     * @return {jQuery}
     */
    $.fn.fluidContentScroller = function (options) {
        var $this = $(this);
        var data = $this.data('fluidContentScroller');
        if (!data) {
            $this.data('fluidContentScroller', (new FluidContentScroller(this, options)));
        }
        return this;
    };

    $.fn.fluidContentScroller.Constructor = FluidContentScroller;

    $.fn.fluidContentScroller.defaults = {
        /** @type {undefined|String|HtmlElement|jQuery} Scrollable container for navigation (default: 'body') */
        container: undefined,

        /** @type {Boolean} Adds a wrapper around the container; can be used only when container is not 'body' */
        autoWrap: true,

        /** @type {Number} Scrolling duration after a click on navigation tab */
        scrollSpeed: 750,

        /** @type {undefined|String} Container scroll easing function */
        scrollEasing: undefined,

        /**
         * Called after plugin initialization and navigation build
         * @type {undefined|Function}
         * @param {jQuery} target
         * @param {jQuery} topNav
         * @param {jQuery} bottomNav
         * */
        onInit: undefined,

        nav: {
            /** @type {String} Class name that gets added to the top and the bottom navigation bars */
            className: 'cs-nav',

            /** @type {String} Class name of the top navigation bar */
            topClass: 'cs-top',

            /** @type {String} Class name of the bottom navigation bar  */
            bottomClass: 'cs-bottom',

            /** @type {String} Class name of content wrapper (added when autoWrap = true) */
            wrapClass: 'cs-wrap',

            /** @type {undefined|String|Object} Navigation show effect; can be used only when container is not 'body' */
            showEffect: undefined,

            /** @type {undefined|String|Object} Navigation hide effect; can be used only when container is not 'body' */
            hideEffect: undefined,

            /** @type {Number} Duration of the show/hide animation for navigation bar */
            duration: 400
        },

        navItem: {
            /** @type {undefined|String|Function} Source for navigation item title (example "[data-cs-title]") */
            title: undefined,

            /** @type {Function} Show effect callback */
            showEffect: $.fn.fadeIn,

            /** @type {Function} Hide effect callback */
            hideEffect: $.fn.fadeOut,

            /** @type {Number} Items show/hide effect duration */
            duration: 200,

            /** @type {Number} Interval between item show/hide effects */
            effectInterval: 25,

            /**
             * Called before navigation item click animation
             * @type {undefined|Function}
             * @param {jQuery} link
             * @param {jQuery} target
             * */
            onBeforeClick: undefined,

            /**
             * Called after navigation item click animation
             * @type {undefined|Function}
             * @param {jQuery} link
             * @param {jQuery} target
             * */
            onAfterClick: undefined
        }
    }

}))(jQuery);
