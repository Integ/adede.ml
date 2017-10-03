/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    function scaleAnimationContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        $('.homepage-banner').css('height', unitHeight);

    }

    function initBannerAnimationSize(element) {

        $(element).each(function () {
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerAnimationSize(element);

    }

    function scaleBannerAnimationSize(element) {

        var windowWidth = $(window).width(),
            windowHeight = $(window).height() + 5,
            animationWidth,
            animationHeight;

        console.log(windowHeight);

        $(element).each(function () {
            var animationAspectRatio = $(this).data('height') / $(this).data('width');

            $(this).width(windowWidth);

            animationHeight = windowHeight;
            animationWidth = animationHeight / animationAspectRatio;
            $(this).css({ 'margin-top': 0, 'margin-left': -(animationWidth - windowWidth) / 2 + 'px' });

            $(this).width(animationWidth).height(animationHeight);

            $('.homepage-banner .animation-container video').addClass('fadeIn animated');

        });
    }
    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        scaleAnimationContainer();

        initBannerAnimationSize('.animation-container .animation img');
        // initBannerAnimationSize('.animation-container .mask');
        initBannerAnimationSize('.animation-container video');

        $(window).on('resize', function () {
            scaleAnimationContainer();
            scaleBannerAnimationSize('.animation-container .animation img');
            // scaleBannerAnimationSize('.animation-container .mask');
            scaleBannerAnimationSize('.animation-container video');
        });
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

            allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({ scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
