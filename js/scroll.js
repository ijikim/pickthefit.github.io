(function ($) {
    $.fn.arctic_scroll = function (options) {
        var hh = $('header').height();
        console.log(hh);
        var gh = $('#product_gnbBar').height();
        console.log(gh);
        var th = ($('#product_gnbBar').hasClass('fixed') ? gh : 0) - hh - gh;
        console.log(th);

        var defaults = {
            elem: $(this),
            speed: 100,
            scroll_selector: 'html,body'
        };
        var options = $.extend(defaults, options);

        options.elem.click(function (e) {
            e.preventDefault();

            // `data-offset` 값 가져오기
            var offset = $(this).attr('data-offset') ? parseInt($(this).attr('data-offset')) : 0;

            // `data-position` 값 가져오기
            var position = $(this).attr('data-position') ? parseInt($(this).attr('data-position')) : false;

            if (position) {
                // 절대 위치로 스크롤
                $(options.scroll_selector).stop(true, false).animate({ scrollTop: position }, options.speed);
            } else {
                // `href` 기준 + `data-offset`
                var target = $(this.hash).offset().top + offset + th;
                $(options.scroll_selector).stop(true, false).animate({ scrollTop: target }, options.speed);
            }
        });
    };
})(jQuery);

$(function(){
    $('.arctic_scroll').arctic_scroll(); // .arctic_scroll 클래스에 적용
});
