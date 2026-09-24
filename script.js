/* =========================================================
   09ZERO - SCRIPT.JS
   NAVBAR + HERO
========================================================= */

"use strict";


/* =========================================================
   NAVBAR
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navbarMenu = document.getElementById("navbarMenu");


if (menuToggle && navbarMenu) {

    /* -----------------------------------------------------
       OPEN / CLOSE MOBILE MENU
    ----------------------------------------------------- */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navbarMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });


    /* -----------------------------------------------------
       CLOSE MENU AFTER CLICKING NAV LINK
    ----------------------------------------------------- */

    const navLinks =
        navbarMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbarMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });

    });


    /* -----------------------------------------------------
       CLOSE MENU WITH ESCAPE
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                navbarMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        }
    );

}


/* =========================================================
   HERO - SMOOTH SCROLL
========================================================= */

const smoothScrollLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


smoothScrollLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   HERO - PARALLAX EFFECT
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    let heroAnimationFrame = null;


    window.addEventListener(
        "mousemove",
        function (event) {

            if (window.innerWidth <= 950) {
                return;
            }


            if (heroAnimationFrame) {
                cancelAnimationFrame(
                    heroAnimationFrame
                );
            }


            heroAnimationFrame =
                requestAnimationFrame(
                    function () {

                        const x =
                            (event.clientX /
                                window.innerWidth) -
                            0.5;

                        const y =
                            (event.clientY /
                                window.innerHeight) -
                            0.5;


                        heroVisual.style.transform =
                            `translate3d(${x * 8}px, ${y * 8}px, 0)`;
                    }
                );

        }
    );


    window.addEventListener(
        "mouseleave",
        function () {

            heroVisual.style.transform =
                "translate3d(0, 0, 0)";
        }
    );

}


/* =========================================================
   HERO - REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches && heroVisual) {

    heroVisual.style.transform =
        "none";

}


/* =========================================================
   09ZERO SCRIPT LOADED
========================================================= */

console.log(
    "09ZERO - Navbar + Hero JS Loaded"
);













/* =========================================================
   09ZERO - WORK SCROLL REVEAL
========================================================= */

const workProjects =
    document.querySelectorAll(".work-project");

if (workProjects.length) {

    const workObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -80px 0px"
            }
        );

    workProjects.forEach(function (project) {

        workObserver.observe(project);

    });
}














/* =========================================================
   09ZERO - WHY US AUTO SLIDER
   4 SECOND AUTO PLAY
   PREVIOUS / NEXT
   DOT NAVIGATION
   PAUSE ON HOVER
   PAUSE ON TAB SWITCH
========================================================= */

const whySlides =
    document.getElementById("whySlides");

const whyPrev =
    document.getElementById("whyPrev");

const whyNext =
    document.getElementById("whyNext");

const whyDots =
    document.querySelectorAll(".why-dot");

const whyCurrent =
    document.getElementById("whyCurrent");

const whySlider =
    document.querySelector(".why-slider");


if (
    whySlides &&
    whyPrev &&
    whyNext &&
    whyDots.length &&
    whyCurrent &&
    whySlider
) {

    let whyCurrentIndex = 0;

    let whyAutoPlay = null;

    const whyTotalSlides =
        whyDots.length;

    const WHY_AUTO_DELAY = 2000;


    /* =====================================================
       UPDATE SLIDE
    ===================================================== */

    function updateWhySlider() {

        whySlides.style.transform =
            `translateX(-${whyCurrentIndex * 100}%)`;


        /* ---------------------------------------------
           UPDATE DOTS
        --------------------------------------------- */

        whyDots.forEach(function (dot, index) {

            const isActive =
                index === whyCurrentIndex;

            dot.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                dot.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                dot.removeAttribute(
                    "aria-current"
                );

            }

        });


        /* ---------------------------------------------
           UPDATE CURRENT NUMBER
        --------------------------------------------- */

        whyCurrent.textContent =
            String(
                whyCurrentIndex + 1
            ).padStart(2, "0");

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextWhySlide() {

        whyCurrentIndex =
            (whyCurrentIndex + 1) %
            whyTotalSlides;

        updateWhySlider();

    }


    /* =====================================================
       PREVIOUS SLIDE
    ===================================================== */

    function previousWhySlide() {

        whyCurrentIndex =
            (
                whyCurrentIndex -
                1 +
                whyTotalSlides
            ) %
            whyTotalSlides;

        updateWhySlider();

    }


    /* =====================================================
       START AUTO PLAY
    ===================================================== */

    function startWhyAutoPlay() {

        stopWhyAutoPlay();

        whyAutoPlay =
            setInterval(
                function () {

                    nextWhySlide();

                },
                WHY_AUTO_DELAY
            );

    }


    /* =====================================================
       STOP AUTO PLAY
    ===================================================== */

    function stopWhyAutoPlay() {

        if (whyAutoPlay) {

            clearInterval(
                whyAutoPlay
            );

            whyAutoPlay = null;

        }

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    whyNext.addEventListener(
        "click",
        function () {

            nextWhySlide();

            startWhyAutoPlay();

        }
    );


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    whyPrev.addEventListener(
        "click",
        function () {

            previousWhySlide();

            startWhyAutoPlay();

        }
    );


    /* =====================================================
       DOT NAVIGATION
    ===================================================== */

    whyDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    whyCurrentIndex =
                        index;

                    updateWhySlider();

                    startWhyAutoPlay();

                }
            );

        }
    );


    /* =====================================================
       PAUSE WHEN MOUSE IS OVER SLIDER
    ===================================================== */

    whySlider.addEventListener(
        "mouseenter",
        function () {

            stopWhyAutoPlay();

        }
    );


    /* =====================================================
       RESUME WHEN MOUSE LEAVES SLIDER
    ===================================================== */

    whySlider.addEventListener(
        "mouseleave",
        function () {

            startWhyAutoPlay();

        }
    );


    /* =====================================================
       PAUSE WHEN TAB IS NOT ACTIVE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {

                stopWhyAutoPlay();

            } else {

                startWhyAutoPlay();

            }

        }
    );


    /* =====================================================
       KEYBOARD CONTROL
       LEFT / RIGHT ARROW
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "ArrowRight"
            ) {

                nextWhySlide();

                startWhyAutoPlay();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                previousWhySlide();

                startWhyAutoPlay();

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const whyReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        !whyReducedMotion.matches
    ) {

        startWhyAutoPlay();

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateWhySlider();


    console.log(
        "09ZERO - Why Us Slider Loaded"
    );

}

