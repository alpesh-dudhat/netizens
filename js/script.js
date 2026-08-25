$(document).ready(function (e) {
  "use strict";
  // Initialize
  gsap.registerPlugin(ScrollTrigger);
  Splitting();
  // Smooth Scroll
  // var locoScroll;

  // function initLocoScroll() {
  //   if (document.querySelector('.smooth-body')) return;
  //   locoScroll = new LocomotiveScroll({
  //     el: document.querySelector('.smooth-body'),
  //     smooth: true,
  //     smoothMobile: true,
  //     getSpeed: true,
  //     getDirection: true
  //   });
  // }

  // window.addEventListener("load", initLocoScroll);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-body"),
    smooth: 0.1,
    firefoxMultiplier: 1000,
    // getSpeed: true,
    getDirection: true,
    // reloadOnContextChange: true,
    smartphone: {
      smooth: false
    },
    tablet: {
      smooth: true
    },
  });

  function stopscroll() {
    locoScroll.stop();
  }

  function startscroll() {
    locoScroll.start();
  }

  const header = document.getElementById("header");
  const social = document.querySelector(".neti-social");
  let hidden = false,
    statics = true;


  // Sticky Header On scroll
  locoScroll.on("scroll", (instance) => {
    let headerHeight = header.getBoundingClientRect().height;
    if (instance.direction === "down" && statics) {
      if (instance.scroll.y > headerHeight) {
        header.classList.add("pinned");
        if (header.classList.contains("home")) {
          header.classList.add("active");
        }
        statics = false;
      }
    }
    if (instance.direction === "up" && !statics) {
      if (instance.scroll.y <= headerHeight) {
        header.classList.remove("pinned");
        social.classList.remove("active");
        if (header.classList.contains("home")) {
          header.classList.remove("active");
        }
        statics = true;
      }
    }
    if (instance.direction === "down" && !hidden) {
      if (instance.scroll.y > headerHeight + 400) {
        //console.log('hidden');
        header.classList.remove("pinned");
        header.classList.add("unpinned");
        social.classList.add("active");
        hidden = true;
      }
    }
    if (instance.direction === "up" && hidden) {
      //console.log('show');
      header.classList.remove("unpinned");
      header.classList.add("pinned");
      hidden = false;
    }
  });


  locoScroll.on("scroll", ScrollTrigger.update);


  ScrollTrigger.scrollerProxy(".smooth-body", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector(".smooth-body").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.defaults({
    scroller: ".smooth-body",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();


  // Responsive Menu
  $("#mobile-menu").on("click", function (e) {
    // $('.navBar nav').toggleClass("active"); //you can list several class names
    $(".navBar").toggleClass("active");
    $("main").toggleClass("slide");
    $("header .navBar nav .menu-reveal .link").toggleClass("line");
    $("header .navBar nav .menu-reveal .link span").addClass("d-inline-block");
    $("body").toggleClass("overflow-hidden");
    $("header").toggleClass("un");

    // Mobile menu reveal text
    const tl = gsap.timeline();
    const btn = gsap.timeline();
    const social = gsap.timeline();

    tl.from(".menu-reveal .line span", {
      y: 200,
      skewY: 10,
      duration: 1.8,
      ease: "power4.out",
      stagger: 0.1,
    });
    btn.fromTo(
      ".menu-reveal .btn_wrapper", {
        y: 1000,
        // skewY: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.1,
      }, {
        y: 0,
      }
    );
    social.from(".menu-reveal .social li .social-link", {
      y: 1000,
      // skewY: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.1,
    });
    e.preventDefault();
  });


  // Menu Close when click on links (required when landing page)
  if ($(window).width() < 992) {
    $("header .navBar nav .menu-reveal .link").on("click", function (e) {
      $("nav").removeClass("active");
      $("header .navBar nav .menu-reveal .link").removeClass("line");
      $("header .navBar nav .menu-reveal .link span").removeClass("d-inline-block");
    });
  }


  // All Swiper Slider
  //Banner Slider
  const swiperheader = new Swiper(".header-slide", {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    pauseOnMouseEnter: true,
    grabCursor: true,
    mousewheel: false,
    speed: 1000,
    effect: "creative",
    creativeEffect: {
      prev: {
        // will set `translateZ(-400px)` on previous slides
        translate: [0, 0, 0],
      },
      next: {
        // will set `translateX(100%)` on next slides
        translate: ["0%", 0, 0],
      },
    },
  });
  // Tech Slider
  const techone = new Swiper('.tech-one', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    reverseDirection: true,
    autoplay: {
      delay: 1,
      reverseDirection: true,
      grabCursor: false,
      disableOnInteraction: false,
    },
    pauseOnMouseEnter: false,
    speed: 3000,
    grabCursor: false,
    mousewheel: false,
  });
  const techtwo = new Swiper('.tech-two', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    disableOnInteraction: false,
    autoplay: {
      delay: 1,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    pauseOnMouseEnter: false,
    speed: 3000,
    grabCursor: false,
    mousewheel: false,
  });

  // Client Review Slider 
  const client = new Swiper(".client-slide", {
    loop: true,
    effect: "fade",
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    pauseOnMouseEnter: true,
    speed: 1200,
    grabCursor: true,
    mousewheel: false,
  });


  // Counting
  const qs = gsap.timeline();
  ScrollTrigger.create({
    trigger: ".quality-section",
    animation: qs,
    start: "top center+=10%",
    end: 'bottom center-=10%',
    onEnter: odo,
  });

  function odo() {
    setTimeout(function () {
      $("#meter1").html(350);
      $("#meter2").html(500);
      $("#meter3").html(35);
      $("#meter4").html(10);
      $("#meter5").html(24);
      $("#meter6").html(7);
      $("#meter7").html(18);
    }, 200);
  }

  $('.service-sec .left li').hover(function () {
    $(".service-sec .right .tab").removeClass('tab-active');
    $(".service-sec .right .tab[data-id='" + $(this).attr('data-id') + "']").addClass("tab-active");
    $(this).parents().find(".service-sec").find(".left li").removeClass('active');
    $(this).addClass('active');
  });

  const bl = gsap.timeline();
  ScrollTrigger.create({
    animation: bl,
    trigger: ".building-sec",
    // scroller: ".smooth-body",
    // toggleActions: 'play none none none',
    anticipatePin: 1,
    // pinSpacing: false,
    start: "top center+=30%",
    end: "600px center",
    scrub: false,
    pin: false,
    // markers: true,
  });
  bl.from(".building-sec .heading ", {
      opacity: 0,
      // duration: 2,
      y: 150,
    })
    .from(".building-sec #cdc", {
      opacity: 0,
    })
    .from(".building-sec .process .box1", {
      opacity: 0,
      // duration: 1,
      scale: 0.75,
      stagger: {
        amount: 0.4
      }
    })
    .to(".building-sec #cdc #forward", {
      x: 175,
      opacity: 1,
      fill: "#58595B",
    })
    .from(".building-sec .process .box2", {
      opacity: 0,
      // duration: 1,
      scale: 0.75,
      stagger: {
        amount: 0.4
      }
    })
    // .set(".building-sec .process .box2 .black", {
    //   autoAlpha: 0,
    // })
    // .from(".building-sec .process .box2 .color", {
    //   display: "none",
    // })
    .to(".building-sec #cdc #forward", {
      x: 450,
      fill: "#3EAFD1",
    })
    .from(".building-sec .process .box3", {
      opacity: 0,
      // duration: 1,
      scale: 0.75,
      stagger: {
        amount: 0.4
      }
    })
    // .set(".building-sec .process .box3 .black", {
    //   autoAlpha: 0,
    // })
    // .from(".building-sec .process .box3 .color", {
    //   display: "none",
    // })
    .to(".building-sec #cdc #forward", {
      x: 750,
      fill: "#0E3572",
    })
    .from(".building-sec .process .box4", {
      opacity: 0,
      // duration: 1,
      scale: 0.75,
      stagger: {
        amount: 0.4
      }
    })
    // .set(".building-sec .process .box4 .black", {
    //   autoAlpha: 0,
    // })
    // .from(".building-sec .process .box4 .color", {
    //   display: "none",
    // })
    .to(".building-sec #cdc #forward", {
      x: 920,
      fill: "#ED1C24",
      opacity: 0,
    })
    .from(".building-sec .process .box5", {
      opacity: 0,
      // duration: 1,
      scale: 0.75,
      stagger: {
        amount: 0.4
      }
    })
    .to(".building-sec .process .box5 img", {
      x: 20,
      y: -20,
    });

  gsap.utils.toArray(".recentworks-sec .card").forEach(function (elems4) {
    var cardbody = elems4.querySelectorAll(".recentworks-sec .card .card-body");
    var overlay = elems4.querySelectorAll(".recentworks-sec .card .imgwrap .overlay");

    const rc = gsap.timeline({
        scrollTrigger: {
          trigger: elems4,
          start: "top center+=10%",
          // scroller: ".smooth-body",
          end: "bottom center-=30%",
          once: true,
          // scrub: 1,
          // markers: true,
          pinSpacing: false,
          onUpdate: ({
            progress
          }) => (rc.progress() < progress ? rc.progress(progress) : null),
          // toggleActions: "play reverse play reverse",
          // id: "scrub"
        },
      })
      .fromTo(
        elems4, {
          y: 100,
          opacity: 0,
          visibility: "hidden",
        }, {
          y: 0,
          opacity: 1,
          visibility: "visible",
        }
      )
      .fromTo(
        overlay,
        2, {
          skewX: 30,
          scale: 1.5,
        }, {
          skewX: 0,
          xPercent: 100,
          transformOrigin: "0% 100%",
          ease: Power4.easeOut,
        },
        "-=1"
      )
      .fromTo(
        cardbody, {
          y: 50,
          opacity: 0,
          stagger: 0.5,
        }, {
          y: 0,
          opacity: 1,
          // background:"white",
          padding: "10px 0",
        },
        "-=1"
      );
  });

  const bb = gsap.timeline({
      scrollTrigger: {
        trigger: ".recentworks-sec .box",
        start: "top center+=20%",
        end: "bottom 60%",
        // scroller: ".smooth-body",
        once: true,
        onUpdate: ({
          progress
        }) => (bb.progress() < progress ? bb.progress(progress) : null),
        toggleActions: "play reverse play reverse",
        scrub: 1,
        // markers: true
      },
    })
    .from(".recentworks-sec .box h4 span", {
      y: 33,
      stagger: 1,
      ease: "power4",
    })
    // .fromTo(
    //   ".recentworks-sec .box .description", {
    //     autoAlpha: 0,
    //     stagger: 1,
    //   }, {
    //     autoAlpha: 1,
    //   }
    // )
    .fromTo(
      ".recentworks-sec .box a", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.8,
      }, {
        autoAlpha: 1,
        y: 0,
      }
    );

  gsap.timeline({
      scrollTrigger: {
        trigger: ".recentworks-sec .right .partner div",
        start: "top center+=30%",
        end: "bottom center",
        // scroller: ".smooth-body",
        once: false,
        onUpdate: ({
          progress
        }) => (bb.progress() < progress ? bb.progress(progress) : null),
        // toggleActions: "play reverse play reverse",
        scrub: false,
      },
    })
    .from(".recentworks-sec .right .partner div", {
      opacity: 0,
      duration: 1,
      scale: 0.75,
      stagger: 0.1,
    });

  // const aa = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".special-sec .left",
  //     scrub: 1,
  //     start: "top center+=10%",
  //     end: "bottom center-=10%",
  //     once: false,
  //   },
  // })
  // .fromTo(
  //   ".special-sec .left h3", {
  //     autoAlpha: 0,
  //     // y: 20,
  //     // stagger: 0.5,
  //   }, {
  //     autoAlpha: 1,
  //   }
  // );
  //.fromTo(".special-sec .left a", {
  //   autoAlpha: 0,
  //   y: 20,
  //   stagger: 0.3,
  // }, {
  //   autoAlpha: 1,
  //   y: 0,
  // });


  const ss = gsap.timeline({
      opacity: 0,
      // ease: "power4",
      scrollTrigger: {
        // scroller: ".smooth-body",
        trigger: ".special-sec .right",
        scrub: true,
        start: "top center",
        end: "bottom center-=30%",
        once: true,
        // onEnter: split,
        // markers: true,
      },
    })
    .from(".special-sec .right .pot-box .pot1", {
      opacity: 0,
      duration: 0.1,
      scale: 0.75,
      stagger: 0.1,
    })
    .from(".special-sec .right .pot-box .pot2", {
      opacity: 0,
      duration: 0.6,
      scale: 0.75,
      stagger: 0.6,
    })
    .from(".special-sec .right .pot-box .pot3", {
      opacity: 0,
      duration: 1,
      scale: 0.75,
      stagger: 1,
    });

  const cc = gsap.timeline({
      scrollTrigger: {
        trigger: ".expert-sec .top",
        start: "top center+=30%",
        end: "bottom center+=20%",
        // scroller: ".smooth-body",
        // once: true,
        // onUpdate: ({
        //   progress
        // }) => cc.progress() < progress ? cc.progress(progress) : null,
        scrub: 4,
        // markers: true
      },
    })
    .from(".expert-sec .heading span", {
      y: 44,
      stagger: 0.5,
    })
    .fromTo(
      ".expert-sec .description", {
        autoAlpha: 0,
        stagger: 1,
        delay: 0.2,
      }, {
        autoAlpha: 1,
      }
    );

  // Expert Tab Section
  var $buttons = $("#pills-tab .nav-link");
  $buttons.on("click", function () {
    var index = $buttons.index(this);
    var $line = $(".expert-svg .path");
    $line.removeClass("active");
    $line.eq(index).addClass("active");
  });

  // Dedicated team
  const dt = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hire-sec .top",
        start: "top center+=30%",
        end: "bottom center-=20px",
        // scroller: ".smooth-body",
        // once: true,
        // toggleActions: "play pause pause pause",
        scrub: true,
        // markers: true,
        onUpdate: ({
          progress
        }) => (dt.progress() < progress ? dt.progress(progress) : null),
      },
    })
    .from(".hire-sec h3 span", {
      y: 95,
      stagger: 0.5,
    })
    .fromTo(
      ".hire-sec p", {
        autoAlpha: 0,
        stagger: 0.2,
        delay: 0.2,
      }, {
        autoAlpha: 1,
      }
    );


  // Quick Quotes
  const $quick = document.querySelector('.quick-quotes');
  const $frameblue = document.querySelector('.page-transition__blue');
  const $button = document.querySelector('.btn-quick');
  const $qclose = document.querySelector('.quick-close');

  let tltransition = gsap.timeline({
      paused: true,
    })
    .fromTo($frameblue, 1, {
      scaleX: 0
    }, {
      opacity: 1,
      scaleX: 1,
      transformOrigin: 'left',
      ease: Power4.easeInOut
    }, )
    .fromTo($quick, 1, {
      xPercent: -100,
    }, {
      opacity: 1,
      xPercent: 0,
      ease: Power4.easeInOut
    }, .2).from('.quick-quotes h3, .quick-quotes p,.quick-quotes h6,.quick-quotes .form-floating,.quick-quotes button,.quick-quotes .input-group ', {
      duration: 0.3,
      opacity: 0,
      y: 15,
      stagger: {
        amount: 0.4
      }
    }, "-=.1");

  let closetransition = gsap.timeline({
    paused: true,
  }).set($frameblue, {
    scaleX: 0
  }).to($quick, 1, {
    xPercent: 100,
    opacity: 1,
    ease: Power4.easeInOut
  })

  $button.addEventListener('click', () => {
    tltransition.play(0);
    stopscroll();
  });
  $qclose.addEventListener('click', () => {
    closetransition.play(0);
    startscroll();
  });

  // Audit Form
  const $audit = document.querySelector('.audit-sec');
  const $overlay = document.querySelector('.audit-overlay');
  const $auditbtn = document.querySelector('.btn-audit');
  const $aclose = document.querySelector('.audit-close');

  let auditpop = gsap.timeline({
    paused: true,
  })
  auditpop.fromTo($overlay, {
      scaleY: 0,
      duration: 0.3,
    }, {
      opacity: 1,
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: Power4.easeInOut
    }, "-=0.1")
    .to($audit, {
      duration: 0.3,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: Power4.easeOut
    }).from('.audit-sec h4, .audit-sec p,.audit-sec h6,.audit-sec .form-floating,.audit-sec button', {
      duration: 0.2,
      opacity: 0,
      y: 15,
      stagger: {
        amount: 0.4
      }
    }, "-=.1");

  $auditbtn.addEventListener('click', function () {
    auditpop.play(0);
    stopscroll();
  });
  [$overlay, $aclose].map(element => element.addEventListener("click", function (e) {
    auditpop.reverse(0);
    startscroll();

  }))


  // Current Oppenings
  const $openings = document.querySelector('#openings');
  const $openingpage = document.querySelector('.current-opening');
  const $cclose = document.querySelector('.current-close');

  let open = gsap.timeline({
      paused: true,
    })
    .fromTo($frameblue, 1, {
      scaleX: 0
    }, {
      opacity: 1,
      scaleX: 1,
      transformOrigin: 'right',
      ease: Power4.easeInOut
    }, )
    .fromTo($openingpage, 1, {
      xPercent: 100,
    }, {
      opacity: 1,
      xPercent: 0,
      ease: Power4.easeInOut
    }, .1)
    .from('.current-opening h3, .current-opening .job-box,.current-opening p', {
      duration: 0.3,
      opacity: 0,
      y: 15,
      stagger: {
        amount: 0.4
      }
    }, "-=.1");

  let close = gsap.timeline({
    paused: true,
  }).set($frameblue, {
    scaleX: 0,
  }).to($openingpage, 1, {
    xPercent: 100,
    opacity: 1,
    ease: Power4.easeInOut
  })

  $openings.addEventListener('click', () => {
    open.play(0);
    stopscroll();
  });
  $cclose.addEventListener('click', () => {
    close.play(0);
    startscroll();
  });

});