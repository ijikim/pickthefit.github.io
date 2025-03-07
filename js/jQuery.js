$(function() {
    // 화면 크기에 맞는 기능 처리 함수
    function screenSize() {
        const width = $(window).width();  // 화면 크기 확인
        
        if (width < 768) {
            // 모바일
            handleMobile();
        } else if (width >= 768 && width <= 1180) {
            // 태블릿
            handleTablet();
        } else {
            // 데스크탑
            handleDesktop();
        }
    }
    
    // 화면 크기 변경 시마다 호출
    screenSize();
    
    // 창 크기 변경 시
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(screenSize, 400);  // 400ms 지연 후 실행
    });
    
    // 모바일에서만 동작하는 코드
    function handleMobile() {
        $('#toggleBtn-on').off('click').on('click', function(e) {
            e.preventDefault();
            $('#Mobile-Nav').addClass('openToggle');
        });

        $('#toggleBtn-off').off('click').on('click', function(e) {
            e.preventDefault();
            $('#Mobile-Nav').removeClass('openToggle');
        });

        $('.Mobile-Gnb>li>a').off('click').on('click', function(e){
            e.preventDefault();
            const parent = $(this).parent();

            if(parent.hasClass('plusToggle')) {
                parent.removeClass('plusToggle');
            }
            else{
                parent.siblings().removeClass('plusToggle');
                parent.siblings().children('.Mobile-Lnb').stop().slideUp('slow');
                parent.addClass('plusToggle');
            }

            parent.children('.Mobile-Lnb').stop().slideToggle('slow');
        });

        function Slide(){
            $(".slider").animate({"margin-left": "-50%"}, 1800, function(){
                $(".slider").css({"margin-left": "0"});
                $(".slider img:first-child").insertAfter(".slider img:last-child");
                Slide();
            });
        }
        Slide();
    }

    // 태블릿에서만 동작하는 코드
    function handleTablet() {
        $('#Lnb').removeAttr('style');
            $('#Lnb>ul>li').removeAttr('style');
            $('#Gnb>ul').off('mouseenter mouseleave');
            $('#ABOUT_btn, #LOOKBOOK_btn, #SHOP_btn, #other_btn').off('mouseenter');
            $('#Lnb>ul').off('mouseenter mouseleave');

        $('#Gnb>ul').off('click').on('click', function(e) {
            e.preventDefault();
            $('#Lnb').slideToggle();
        });

        function Slide(){
            $(".slider").animate({"margin-left": "-18%"}, 1800, function(){
                $(".slider").css({"margin-left": "0.31rem"});
                $(".slider img:first-child").insertAfter(".slider img:last-child");
                Slide();
            });
        }
        Slide();
    }

    // 데스크탑에서만 동작하는 코드
    function handleDesktop() {
        $('#ABOUT_btn').off('mouseenter').on('mouseenter', function(e) {
            e.preventDefault();
            $('#Lnb>ul>li').stop().hide();
            $('#Lnb1').stop().show();
        });

        $('#LOOKBOOK_btn').off('mouseenter').on('mouseenter', function(e) {
            e.preventDefault();
            $('#Lnb>ul>li').stop().hide();
            $('#Lnb2').stop().show();
        });

        $('#SHOP_btn').off('mouseenter').on('mouseenter', function(e){
            e.preventDefault();
            $('#Lnb>ul>li').stop().hide();
            $('#Lnb3').stop().show();
        });
        
        $('#other_btn').off('mouseenter').on('mouseenter', function(e){
            e.preventDefault();
            $('#Lnb>ul>li').stop().hide();
            $('#Lnb4').stop().show();
        });
        
        $('#Gnb>ul').off('mouseenter click').on('mouseenter click', function(e){
            e.preventDefault();
            $('#Lnb').stop().slideDown('slow');
        });
        
        $('#Gnb>ul').off('mouseleave').on('mouseleave', function(e){
            e.preventDefault();
            $('#Lnb').stop().slideUp('slow');
        });
        
        $('#Lnb').off('mouseenter').on('mouseenter', function(e){
            e.preventDefault();
            $('#Lnb').stop().slideDown('slow');
        });
        
        $('#Lnb').off('mouseleave').on('mouseleave', function(e){
            e.preventDefault();
            $('#Lnb').stop().slideUp('slow');
        });

        function Slide(){
            $(".slider").animate({"margin-left": "-18%"}, 1800, function () {
                $(".slider").css({"margin-left": "0.31rem"});
                $(".slider img:first-child").insertAfter(".slider img:last-child");
                Slide();
            });
        }
        Slide();
        $(".slider").removeAttr("style");
        $(".slider").off("animate");
        $(".slider img:first-child").off("insertAfter");
    }

    // 룩북 디테일 이미지 슬라이드 스와이프 걸기
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // BestSeller 이미지 변환
    var counter = 0;
    var images1 = '1.jpg';
    var images2 = '2.jpg';

    setInterval(function(){
        var img = $('.images');
        var newimages = (counter % 2 === 0) ? images1 : images2;

        $(img).each(function(){
            var imgSrc = $(this).attr("src");
            var newSrc = imgSrc.replace(newimages, (newimages === images1) ? images2 : images1);
            $(this).attr('src', newSrc);
        });
        counter++;
    }, 1000);

    $('.BestSeller_img').trigger('mouseleave');

    // 검색창 인기리스트 탭리스트
    $(".tab-title li").on('click',function(){
        var idx = $(this).index();
        $(".tab-title li").removeClass("on");
        $(".tab-title li").eq(idx).addClass("on");
        $(".tab-cont>div").hide();
        $(".tab-cont>div").eq(idx).show();
    });

    // 검색창 열기, 닫기
    $('#searchBtn-on').off('click').on('click', function(e){
        e.preventDefault();
        $('#search-container').addClass('open-container');
    });

    $('#searchBtn-off').off('click').on('click', function(e){
        e.preventDefault();
        $('#search-container').removeClass('open-container');
    });

// 룩북 페이지 전체보기 탭 기능 설정
$('.looktabBtn').on('click', function() {
    $('.looktabBtn').removeClass('active-tab color');
    $(this).addClass('active-tab color');
    
    // 선택한 탭에 맞게 보이도록 처리
    var target = $(this).data('target');
    $('#gallery a').hide(); // 먼저 모든 이미지를 숨깁니다.
    
    if(target === 'all') {
        $('#gallery a').show(); // 전체보기일 경우 모든 이미지 보여줌
    } else {
        $('#gallery a.' + target).show(); // 남성/여성 카테고리 필터링
    }
    
    // 탭 변경 후 카테고리 필터링 적용
    applyCategoryFilter();
});

    // 카테고리 필터링 적용
    function applyCategoryFilter() {
        // 선택된 필터 값 가져오기
        var isSpringChecked = $('input[name="spring"]:checked').length > 0;
        var isSummerChecked = $('input[name="summer"]:checked').length > 0;
        var isFallChecked = $('input[name="fall"]:checked').length > 0;
        var isWinterChecked = $('input[name="winter"]:checked').length > 0;

        var isDailyChecked = $('input[name="daily"]:checked').length > 0;
        var isCampusChecked = $('input[name="campus"]:checked').length > 0;
        var isWorkChecked = $('input[name="work"]:checked').length > 0;

        var isLovelyChecked = $('input[name="lovely"]:checked').length > 0;
        var isChicChecked = $('input[name="chic"]:checked').length > 0;
        var isStreetChecked = $('input[name="street"]:checked').length > 0;

        // 선택된 필터가 하나도 없을 경우, 모든 항목을 보이게 처리
        var target = $('.looktabBtn.active-tab').data('target'); // 현재 활성화된 탭
        if(target === 'all') {
            $('#gallery a').show(); // 전체보기일 경우 모든 이미지 보여줌
        } else {
            $('#gallery a.' + target).show(); // 남성/여성 카테고리 필터링
        }

        // 선택된 필터에 맞는 항목만 필터링
        $('#gallery a:visible').each(function() {
            var $item = $(this);
            var imgAlt = $item.find('img').attr('alt'); // alt 속성

            var showImage = true;

            if (isSpringChecked && !imgAlt.includes('봄')) showImage = false;
            if (isSummerChecked && !imgAlt.includes('여름')) showImage = false;
            if (isFallChecked && !imgAlt.includes('가을')) showImage = false;
            if (isWinterChecked && !imgAlt.includes('겨울')) showImage = false;

            if (isDailyChecked && !imgAlt.includes('데일리')) showImage = false;
            if (isCampusChecked && !imgAlt.includes('캠퍼스')) showImage = false;
            if (isWorkChecked && !imgAlt.includes('출근')) showImage = false;

            if (isLovelyChecked && !imgAlt.includes('러블리')) showImage = false;
            if (isChicChecked && !imgAlt.includes('시크')) showImage = false;
            if (isStreetChecked && !imgAlt.includes('스트릿')) showImage = false;

            // 최종적으로 필터 조건을 만족하는 이미지만 보이게
            if (showImage) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    }

    // 카테고리 버튼 클릭시 필터링 적용
    $('#categoryBtn-search').on('click', function(e) {
        e.preventDefault(); // 기본 폼 제출 방지
        
        // 필터링 적용
        applyCategoryFilter();
    });

    // 카테고리 열고 닫기
    $('#categoryBtn').on('click', function(){   
        if ($('#categoryForm').is(':visible')) {
            $('#categoryBtn-off').css({"display": "none"});
            $('#categoryBtn-on').css({"display": "inline"});
            $('#categoryForm').slideUp('slow');
        } else {
            $('#categoryBtn-on').css({"display": "none"});
            $('#categoryBtn-off').css({"display": "inline"});
            $('#categoryForm').slideDown('slow');
        }
    });

    // 룩북 페이지 사진 오버 시 사진 변경
    $("#gallery img").on('mouseenter', function() {
        let currentSrc = $(this).attr("src");
        $(this).attr("src", currentSrc.replace("-a.jpg", "-b.jpg"));
    });

    $("#gallery img").on('mouseleave', function() {
        let currentSrc = $(this).attr("src");
        $(this).attr("src", currentSrc.replace("-b.jpg", "-a.jpg"));
    });

    // 작은 상품 이미지 클릭 시 큰 이미지로 변경
    var sImg = $('#preview>ul>li>a');
    var bImg = $('#preview_gallery>img');
    sImg.on('click', function(e){
        e.preventDefault();
        var path = $(this).attr('href');
        bImg.attr('src', path);
        bImg.css({'opacity':0}).stop().animate({'opacity':1},400);
        return false;
    });

    // 색상 라벨 클릭 시 color name 변경
    $('.product_color label').on('click',function(){
        var color = $(this).text();
        console.log(color);
        $('.product_color>p').text(`색상(Color) - ${color}`);
    });

    // 배송일자 설정
    var today = new Date();
    today.setDate(today.getDate() + 4);
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var weekday = today.toLocaleString('default', {weekday: 'short'});
    var futureDate = (month < 10 ? '0' + month : month) + '월 ' + (day < 10 ? '0' + day : day) + '일(' + weekday +') 도착 예정 · 도착 확률 79%';
    $('#forwarding').text(futureDate);

    // Product 네비바 스크롤 시 상단 고정
    var subNavOffset = $('#product_gnbBar').offset().top;
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop >= subNavOffset) {
            $('#product_gnbBar').addClass('fixed');
        } else {
            $('#product_gnbBar').removeClass('fixed');
        }

        var scrollPosition = $(window).scrollTop();
        var sections = $('.section');
        var navLinks = $('#product_gnbBar a');

        sections.each(function(index) {
            var sectionTop = $(this).offset().top - 200;
            var sectionHeight = $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.removeClass('on');
                navLinks.eq(index).addClass('on');
            }
        });
    });

    // Product 네비바 클릭 시 색 변경
    $('#product_gnbBar>ul>li>a').on('click', function(){
        $('#product_gnbBar>ul>li>a').removeClass('on');
        $(this).addClass('on');
    });
});
