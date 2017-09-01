/*global $, jQuery, document, window, navigator, FSS, resize, requestAnimationFrame*/
/* ==========================================================================
Document Ready Function
========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var WindowsHeight, HomeSectionContainer, CalcMarginTop, formInput, sformInput, onMobile, fcontainer, renderer, scene, light, geometry, material, mesh, now, start;

    /* ==========================================================================
    Modify Copied Text
    ========================================================================== */
    function addLink() {
        var body_element, selection, pagelink, copytext, newdiv;
        body_element = document.getElementsByTagName('body')[0];
        selection = window.getSelection();
        pagelink = " Read more at: <a href='" + document.location.href + "'>" + document.location.href + "</a>";
        copytext = selection + pagelink;
        newdiv = document.createElement('div');
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';
        body_element.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);
        window.setTimeout(function () {
            body_element.removeChild(newdiv);
        }, 0);
    }
    document.oncopy = addLink;


    /* ==========================================================================
    Animating Member Social Icons
    ========================================================================== */
    $('.member-box').mouseenter(function () {
        var delay = 0;
        $(this).find('.member-overlayer ul li').each(function () {
            $(this).delay(delay).animate({
                opacity: 1
            }, 10);
            delay += 150;
        });
    });
    $('.member-box').mouseleave(function () {
        var delay = 0;
        $(this).find('.member-overlayer ul li').each(function () {
            $(this).delay(delay).animate({
                opacity: 0
            }, 10);
            delay += 10;
        });
    });


    /* ==========================================================================
    Placeholder
    ========================================================================== */
    $('input, textarea').placeholder();


    /* ==========================================================================
    Home Section Height
    ========================================================================== */
    WindowsHeight = $(window).height();
    HomeSectionContainer = $('#home-section-container').height();
    CalcMarginTop = (WindowsHeight - HomeSectionContainer) / 2;

    $('#home-section').css({height: WindowsHeight});
    $('#home-section-container').css({top: CalcMarginTop });


    /* ==========================================================================
    CountDown Timer
    ========================================================================== */
    $('#countdown_dashboard').countDown({
        targetDate: {
            'day': 15,
            'month': 9,
            'year': 2017,
            'hour':  6,
            'min': 0,
            'sec': 0,
            'new_utc':0,
        },
        omitWeeks: true
    });


    /* ==========================================================================
    FORM Validation
    ========================================================================== */
    $('form#form').submit(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
        var hasError = false;
        $('.requiredField').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            formInput = $(this).serialize();
            $.post($(this).attr('action'), formInput, function (data) {
                $('form#form').append('<div class="success"><div class="col-md-12"><div class="alert alert-nesto"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><p>Thanks! Your email was successfully sent. We will contact you asap.</p></div></div></div>');
            });
            $('.requiredField').val('');
        }
        return false;
    });
    $('form#form input').focus(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
    });
    $('form#form textarea').focus(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
    });


    /* ==========================================================================
    Twitter Feed
    ========================================================================== */
    $('.tweetfeed .tweet').twittie({
        dateFormat: '%b. %d, %Y',
        template: '<a href="http://twitter.com/NestoLab" title="Twitter"><i class="fa fa-twitter"></i></a> {{tweet}}',
        count: 2,
        hideReplies: true
    });


    /* ==========================================================================
    Flickr Feed
    ========================================================================== */
    $('#flickr-feed').jflickrfeed({
        limit: 12,
        qstrings: {
            id: '25461271@N07'
        },
        itemTemplate: '<li>' + '<a href="{{image_b}}" class="fancybox" data-fancybox-group="gall1" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>' + '</li>'
    });


    /* ==========================================================================
    Fancy Box
    ========================================================================== */
    $(".fancybox").fancybox({
        helpers : {
            title : {
                type : 'over'
            },
            overlay : {
                speedOut : 0,
                locked: false
            }
        }
    });


    /* ==========================================================================
    Subscribe
    ========================================================================== */
    $('form#sform').submit(function () {
        $('form#sform .serror').remove();
        $('form#sform .ssuccess').remove();
        var shasError = false;
        $('.srequiredField').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                $(this).parent().append('<span class="serror"><i class="fa fa-exclamation-triangle"></i></span>');
                shasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    $(this).parent().append('<span class="serror"><i class="fa fa-exclamation-triangle"></i></span>');
                    shasError = true;
                }
            }
        });
        if (!shasError) {
            sformInput = $(this).serialize();
            $.post($(this).attr('action'), sformInput, function (data) {
                $('form#sform').append('<span class="ssuccess"><i class="fa fa-check"></i></span>');
            });
            $('.srequiredField').val('');
        }
        return false;
    });
    $('form#sform input').focus(function () {
        $('form#sform .serror').remove();
        $('form#sform .ssuccess').remove();
    });


    /* ==========================================================================
    ToolTip
    ========================================================================== */
    $("a[data-rel=tooltip]").tooltip({container: 'body'});


    /* ==========================================================================
    on mobile?
    ========================================================================== */
	onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

	if (onMobile === true) {
        $("a[data-rel=tooltip]").tooltip('destroy');
        jQuery('#team-section').css("background-attachment", "scroll");
    }


    /* ==========================================================================
    Parallax
    ========================================================================== */
    jQuery('#team-section').parallax("50%", -0.5);


    /* ==========================================================================
    Flat Surface Shader
    ========================================================================== */
    fcontainer = document.getElementById('home-section-wrapper');
    renderer = new FSS.CanvasRenderer();
    scene = new FSS.Scene();
    light = new FSS.Light('#111122', '#2c3e50');
    geometry = new FSS.Plane(fcontainer.offsetWidth, fcontainer.offsetHeight, 18, 12);
    material = new FSS.Material('#ffffff', '#ffffff');
    mesh = new FSS.Mesh(geometry, material);
    now = Date.now();
    start = Date.now();

    function initialise() {
        scene.add(mesh);
        scene.add(light);
        fcontainer.appendChild(renderer.element);
        window.addEventListener('resize', resize);
    }
    function resize() {
        renderer.setSize(fcontainer.offsetWidth, fcontainer.offsetHeight);
    }
    function animate() {
        now = Date.now() - start;
        light.setPosition(300 * Math.sin(now * 0.001), 150 * Math.cos(now * 0.0005), 150);
        renderer.render(scene);
        requestAnimationFrame(animate);
    }

    initialise();
    resize();
    animate();


}); // JavaScript Document




/* ==========================================================================
Window Resize
========================================================================== */
$(window).resize(function () {

    'use strict';

    var WindowsHeight, HomeSectionContainer, CalcMarginTop;

    /* ==========================================================================
    Home Section Height
    ========================================================================== */
    WindowsHeight = $(window).height();
    HomeSectionContainer = $('#home-section-container').height();
    CalcMarginTop = (WindowsHeight - HomeSectionContainer) / 2;

    $('#home-section').css({height: WindowsHeight});
    $('#home-section-container').css({top: CalcMarginTop });
    $('#home-section canvas').css({height: '100% !important'});
    $('#home-section canvas').css({width: '100% !important'});

});




/* ==========================================================================
Window Load
========================================================================== */
jQuery(window).load(function () {

    'use strict';

    /* ==============================================
    Loader
    =============================================== */
    var LoaderDelay = 350,
        LoaderFadeOutTime = 800;

    function hideLoader() {
        var loadingLoader = $('#Loader');
        loadingLoader.fadeOut();
    }
    hideLoader();

    /* ==========================================================================
    Funny Text
    ========================================================================== */
    $('#welcome-msg').funnyText({
        speed: 500,
        fontSize: '2em',
        color: '#ffffff',
        activeColor: '#3ECB7F',
        borderColor: 'none'
    });

    $('#services-section-title').funnyText({
        speed: 500,
        fontSize: '1.5em',
        color: '#2c3e50',
        activeColor: '3ECB7F',
        borderColor: 'none'
    });

    $('#team-section-title').funnyText({
        speed: 500,
        fontSize: '1.5em',
        color: '#ffffff',
        activeColor: '#2c3e50',
        borderColor: 'none'
    });

    $('#contact-section-title').funnyText({
        speed: 500,
        fontSize: '1.5em',
        color: '#2c3e50',
        activeColor: '#f1c40f',
        borderColor: 'none'
    });

});
