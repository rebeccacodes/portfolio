////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;

$(document).ready(function ($) {
    "use strict";

    $(".ts-bubble-border").each(function () {
        var $this = $(this);
        $this.prepend("<i></i><i></i><i></i><i></i><i></i>");
    });

    $("#ts-content .ts-bubble-border, #ts-footer .ts-bubble-border").each(function () {
        var $this = $(this);
        $this.isInViewport(function (status) {
            if (status === "entered") {
                $this.addClass("in");
            }
            else if (status === "leaved") {
                $this.removeClass("in");
            }
        });
    });

    $(".ts-promo-numbers").each(function () {
        $(this).isInViewport(function (status) {
            if (status === "entered") {
                for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                    var el = document.querySelectorAll('.odometer')[i];
                    el.innerHTML = el.getAttribute("data-odometer-final");
                }
            }
        });
    });

    $("body").imagesLoaded(function () {
        $("body").addClass("loading-done");
        $("#ts-hero .ts-bubble-border").each(function () {
            var $this = $(this);
            var $active = $(this).find(".active");

            $this.width($this.find(".active").outerWidth());
            $this.height($this.find(".active").outerHeight());

            setTimeout(function () {
                $("#ts-hero .ts-bubble-border").addClass("in");
                setInterval(function () {
                    $this.find(".active").addClass("out");
                    setTimeout(function () {
                        $this.find(".active").removeClass("active out");
                        if ($active.next().length) {
                            $active.next().addClass("active");
                            $active = $active.next();
                        }
                        else {
                            $active = $this.find(".ts-title-rotate span:first");
                            $active.addClass("active");
                        }
                        $this.width($this.find(".active").outerWidth());
                        $this.height($this.find(".active").outerHeight());

                    }, 800);
                }, 3000);
            }, 500);

        });
        $("[data-animate]").scrolla({
            mobile: true
        });

        $("input").blur(function () {
            this.value = this.value.trim();
        });

        $("textarea").blur(function () {
            this.value = this.value.trim();
        });

    });



    $(".ts-title-rotate span").each(function () {
        //alert( $(this).width() );
    });

    $('.navbar-nav .nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    $(".ts-img-into-bg").each(function () {
        $(this).css("background-image", "url(" + $(this).find("img").attr("src") + ")");
    });

    //  Background

    $("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function () {
        var $this = $(this);

        if ($this.hasClass("ts-separate-bg-element")) {
            $this.append('<div class="ts-background">');

            // Background Color

            if ($("[data-bg-color]")) {
                $this.find(".ts-background").css("background-color", $this.attr("data-bg-color"));
            }

            // Particles

            if ($this.attr("data-bg-particles-line-color") || $this.attr("data-bg-particles-dot-color")) {
                $this.find(".ts-background").append('<div class="ts-background-particles">');
                $(".ts-background-particles").each(function () {
                    var lineColor = $this.attr("data-bg-particles-line-color");
                    var dotColor = $this.attr("data-bg-particles-dot-color");
                    var parallax = $this.attr("data-bg-particles-parallax");
                    $(this).particleground({
                        density: 15000,
                        lineWidth: 0.2,
                        lineColor: lineColor,
                        dotColor: dotColor,
                        parallax: parallax,
                        proximity: 200
                    });
                });
            }

            // Background Image

            if ($this.attr("data-bg-image") !== undefined) {
                $this.find(".ts-background").append('<div class="ts-background-image">');
                $this.find(".ts-background-image").css("background-image", "url(" + $this.attr("data-bg-image") + ")");
                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size"));
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position"));
                $this.find(".ts-background-image").css("opacity", $this.attr("data-bg-image-opacity"));

                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size"));
                $this.find(".ts-background-image").css("background-repeat", $this.attr("data-bg-repeat"));
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position"));
                $this.find(".ts-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode"));
            }

            // Parallax effect

            if ($this.attr("data-bg-parallax") !== undefined) {
                $this.find(".ts-background-image").addClass("ts-parallax-element");
            }
        }
        else {

            if ($this.attr("data-bg-color") !== undefined) {
                $this.css("background-color", $this.attr("data-bg-color"));
                if ($this.hasClass("btn")) {
                    $this.css("border-color", $this.attr("data-bg-color"));
                }
            }

            if ($this.attr("data-bg-image") !== undefined) {
                $this.css("background-image", "url(" + $this.attr("data-bg-image") + ")");

                $this.css("background-size", $this.attr("data-bg-size"));
                $this.css("background-repeat", $this.attr("data-bg-repeat"));
                $this.css("background-position", $this.attr("data-bg-position"));
                $this.css("background-blend-mode", $this.attr("data-bg-blend-mode"));
            }

        }
    });

    //  Parallax Background Image

    $("[data-bg-parallax='scroll']").each(function () {
        var speed = $(this).attr("data-bg-parallax-speed");
        var $this = $(this);
        var isVisible;
        var backgroundPosition;

        $this.isInViewport(function (status) {
            if (status === "entered") {
                isVisible = 1;
                var position;

                $(window).scroll(function () {
                    if (isVisible === 1) {
                        position = $(window).scrollTop() - $this.offset().top;
                        backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window).height() + $this.height())) * 100);
                        if ($this.find(".ts-parallax-element").hasClass("ts-background-image")) {
                            $this.find(".ts-background-image.ts-parallax-element").css("background-position-y", (position / speed) + "px");
                        }
                        else {
                            $this.find(".ts-parallax-element").css("transform", "translateY(" + (position / speed) + "px)");
                        }
                    }
                });
            }
            if (status === "leaved") {
                isVisible = 0;
            }
        });
    });

    $(".ts-labels-inside-input input, .ts-labels-inside-input textarea").focusin(function () {
        $(this).parent().find("label").addClass("focused");
    })
        .focusout(function () {
            if ($(this).val().length === 0) {
                $(this).parent().find("label").removeClass("focused")
            }
        });

    $("select").each(function () {
        $(this).wrap('<div class="select-wrapper"></div>');
    });

    // Magnific Popup

    var $popupImage = $(".popup-image");

    if ($popupImage.length > 0) {
        $popupImage.magnificPopup({
            type: 'image',
            fixedContentPos: false,
            gallery: { enabled: true },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            callbacks: {
                // This prevents pushing the entire page to the right after opening Magnific popup image
                open: function () {
                    $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
                },
                close: function () {
                    $(".page-wrapper, .navbar-nav").css("margin-right", 0);
                }
            }
        });
    }



    $(".ts-form-email [type='submit']").each(function () {
        var text = $(this).text();
        $(this).html("").append("<span>" + text + "</span>").prepend("<div class='status'><i class='fas fa-circle-notch fa-spin spinner'></i></div>");
    });

    $(".ts-form-email .btn[type='submit']").on("click", function (e) {
        var $button = $(this);
        var $form = $(this).closest("form");
        var pathToPhp = $(this).closest("form").attr("data-php-path");
        $form.validate({
            submitHandler: function () {
                $button.addClass("processing");
                $.post(pathToPhp, $form.serialize(), function (response) {
                    $('.status').empty();
                    $button.addClass("done").find(".status").append('<i class="fas fa-check-circle"></i>').prop("disabled", true);
                    $form.find("input[type=text], input[type=email], textarea").val("");
                    setTimeout(function () {
                        $('.status').empty();
                        $button.removeClass("processing");
                    }, 3000);


                });

                return false;
            }
        });

    });

    $("form:not(.ts-form-email)").each(function () {
        $(this).validate({
            rules: {
                name: {
                    required: {
                        depends: function () {
                            $(this).val($.trim($(this).val()));
                            return true;
                        }
                    },
                    name: true
                }
            }
        });
    });

    $(".progress").each(function () {
        var $this = $(this);
        $this.find(".ts-progress-value").text($this.attr("data-progress-width"));
        $this.isInViewport(function (status) {
            if (status === "entered") {
                $this.find(".progress-bar").width($this.attr("data-progress-width"));
                $this.find(".ts-progress-value").css("left", $this.attr("data-progress-width"));
            }
        });
    });



    // On RESIZE actions

    $(window).on("resize", function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 250);
    });

    // On SCROLL actions

    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= $(window).height()) {
            $(".navbar").addClass("in");
        }
        else {
            $(".navbar").removeClass("in");
        }
    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing() {
    heroHeight();

}

// Set Hero height

function heroHeight() {
    $(".ts-full-screen").height($(window).height());
}

// Smooth Scroll

$(".ts-scroll").on("click", function (event) {
    if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        &&
        location.hostname === this.hostname
    ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex', '-1');
                    $target.focus();
                }
            });
        }
    }
});



// Return scrollbar width

function getScrollBarWidth() {
    var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
        widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}


