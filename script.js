// ===== FOY PILATES — script.js =====
// GSAP Core + ScrollTrigger animations

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ==================== NAV ====================
  const nav = document.querySelector("nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Shrink nav on scroll + show/hide scroll-to-top button
  const scrollTopBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
    }
  }, { passive: true });

  // Scroll to top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // ==================== GSAP DEFAULTS ====================
  gsap.defaults({
    duration: 0.8,
    ease: "power2.out",
  });

  // ==================== GSAP MATCH MEDIA ====================
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 861px)",
      isMobile: "(max-width: 860px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions;

      // Skip all animations if user prefers reduced motion
      if (reduceMotion) return;

      // ==================== HERO ANIMATIONS ====================
      const heroTl = gsap.timeline({ delay: 0.2 });

      // Hero image — subtle scale-in
      heroTl.from(".hero-img img", {
        scale: 1.15,
        duration: 1.4,
        ease: "power3.out",
      });

      // Hero text elements — staggered entrance
      heroTl.from(
        ".eyebrow",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
        },
        "-=0.9"
      );

      heroTl.from(
        ".hero-title",
        {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=0.5"
      );

      heroTl.from(
        ".hero-sub",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
        },
        "-=0.5"
      );

      heroTl.from(
        ".hero-desc",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

      heroTl.from(
        ".btns .btn",
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.5,
        },
        "-=0.3"
      );

      heroTl.from(
        ".stat",
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.3"
      );

      // ==================== HERO PARALLAX (desktop only) ====================
      if (isDesktop) {
        gsap.to(".hero-img img", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ==================== TICKER ====================
      gsap.from(".ticker", {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".ticker",
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      // ==================== QUOTE SECTION ====================
      const quoteTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".quote-strip",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      quoteTl.from(".quote-strip blockquote", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      quoteTl.from(
        ".quote-strip cite",
        {
          y: 15,
          autoAlpha: 0,
          duration: 0.5,
        },
        "-=0.4"
      );

      // ==================== ABOUT SECTION ====================
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (isDesktop) {
        aboutTl.from(".about-img", {
          x: -60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
        });

        aboutTl.from(
          ".about-content",
          {
            x: 60,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        );
      } else {
        aboutTl.from(".about-img", {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
        });

        aboutTl.from(
          ".about-content",
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
          },
          "-=0.4"
        );
      }

      // About inner elements
      aboutTl.from(
        ".about-content .sec-label, .about-content .sec-title, .about-content .sec-body",
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4"
      );

      aboutTl.from(
        ".tag",
        {
          y: 15,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.4,
        },
        "-=0.2"
      );

      // ==================== SERVICES SECTION ====================
      gsap.from(".services .sec-label, .services .sec-title, .sec-body-center", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".services",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Service cards — all appear together, aligned
      gsap.from(".srv", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".srv-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Service numbers — count-up feel
      ScrollTrigger.batch(".srv-n", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        },
        start: "top 85%",
        once: true,
      });

      // ==================== SCHEDULE SECTION ====================
      const schTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".schedule",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      schTl.from(".sch-header", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
      });

      schTl.from(
        ".sch-card",
        {
          y: 40,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      schTl.from(
        ".sch-note",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
        },
        "-=0.2"
      );

      // ==================== GALLERY CAROUSEL ====================
      gsap.from(".gallery .sec-label, .gallery .sec-title", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".gallery",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".carousel-wrapper", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".carousel-wrapper",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ==================== CONTACT SECTION ====================
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (isDesktop) {
        contactTl.from(".contact-left", {
          x: -50,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
        });

        contactTl.from(
          ".contact-right",
          {
            x: 50,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6"
        );
      } else {
        contactTl.from(".contact-left", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
        });

        contactTl.from(
          ".contact-right",
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
          },
          "-=0.3"
        );
      }

      // Contact info items
      contactTl.from(
        ".ci",
        {
          x: -20,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.5"
      );

      // Form fields
      contactTl.from(
        ".fr, .contact-right h3, .contact-right p",
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.4,
        },
        "-=0.4"
      );

      // ==================== FOOTER ====================
      gsap.from("footer", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: "footer",
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      // ==================== STAT NUMBERS ANIMATION ====================
      // Animate stat numbers counting up
      document.querySelectorAll(".stat strong").forEach((el) => {
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const endVal = parseInt(match[1]);
        const suffix = text.replace(match[1], "");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: endVal,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }
  );

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  });

  // ==================== CAROUSEL ====================
  const track = document.getElementById("carouselTrack");
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dotsContainer = document.getElementById("carouselDots");

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let slidesPerView = 3;
    let slideWidth = 0;
    let maxIndex = 0;

    const calcDimensions = () => {
      const vw = window.innerWidth;
      if (vw <= 480) slidesPerView = 1;
      else if (vw <= 860) slidesPerView = 2;
      else slidesPerView = 3;

      const gap = 12;
      const viewportWidth = track.parentElement.offsetWidth;
      slideWidth = (viewportWidth - gap * (slidesPerView - 1)) / slidesPerView;
      slides.forEach((s) => { s.style.flex = `0 0 ${slideWidth}px`; });
      maxIndex = Math.max(0, slides.length - slidesPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
    };

    // Build dots
    const buildDots = () => {
      dotsContainer.innerHTML = "";
      const totalDots = maxIndex + 1;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
        d.classList.toggle("active", i === currentIndex);
      });
    };

    const goTo = (index) => {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const gap = 12;
      const offset = currentIndex * (slideWidth + gap);

      gsap.to(track, {
        x: -offset,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Efecto en las slides visibles
      const visibleSlides = slides.slice(currentIndex, currentIndex + slidesPerView);
      gsap.fromTo(visibleSlides,
        { scale: 0.92, autoAlpha: 0.7 },
        { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );

      updateDots();
    };

    prevBtn.addEventListener("click", () => {
      // Animación de la flecha
      gsap.fromTo(prevBtn, { x: 0 }, { x: -6, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" });
      goTo(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      gsap.fromTo(nextBtn, { x: 0 }, { x: 6, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" });
      goTo(currentIndex + 1);
    });

    // Init
    calcDimensions();
    buildDots();
    gsap.set(track, { x: 0 });

    // Recalc on resize
    window.addEventListener("resize", () => {
      calcDimensions();
      buildDots();
      goTo(currentIndex);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchDelta = 0;

    track.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchmove", (e) => {
      touchDelta = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener("touchend", () => {
      if (touchDelta > 50) goTo(currentIndex - 1);
      else if (touchDelta < -50) goTo(currentIndex + 1);
      touchDelta = 0;
    });
  }

  // ==================== LIGHTBOX WITH NAVIGATION ====================
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const lbClose = lightbox.querySelector(".lightbox-close");
    const lbPrev = lightbox.querySelector(".lightbox-prev");
    const lbNext = lightbox.querySelector(".lightbox-next");
    const lbCounter = document.getElementById("lightboxCounter");
    const allSlides = Array.from(document.querySelectorAll(".carousel-slide img"));
    let lbIndex = 0;

    const showSlide = (index, direction) => {
      lbIndex = (index + allSlides.length) % allSlides.length;
      const src = allSlides[lbIndex].src.replace(/w=\d+/, "w=1600");
      const alt = allSlides[lbIndex].alt;

      const xFrom = direction === "next" ? 80 : direction === "prev" ? -80 : 0;

      gsap.to(lbImg, {
        autoAlpha: 0,
        x: -xFrom,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          lbImg.src = src;
          lbImg.alt = alt;
          lbCounter.textContent = `${lbIndex + 1} / ${allSlides.length}`;
          gsap.fromTo(lbImg,
            { autoAlpha: 0, x: xFrom, scale: 0.95 },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.35, ease: "power2.out" }
          );
        },
      });
    };

    // Open lightbox
    document.querySelectorAll(".carousel-slide").forEach((slide, i) => {
      slide.addEventListener("click", () => {
        lbIndex = i;
        const src = allSlides[i].src.replace(/w=\d+/, "w=1600");
        lbImg.src = src;
        lbImg.alt = allSlides[i].alt;
        lbCounter.textContent = `${i + 1} / ${allSlides.length}`;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
        gsap.fromTo(lbImg, { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      });
    });

    // Navigation
    lbPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      gsap.fromTo(lbPrev, { x: 0 }, { x: -6, duration: 0.15, yoyo: true, repeat: 1 });
      showSlide(lbIndex - 1, "prev");
    });

    lbNext.addEventListener("click", (e) => {
      e.stopPropagation();
      gsap.fromTo(lbNext, { x: 0 }, { x: 6, duration: 0.15, yoyo: true, repeat: 1 });
      showSlide(lbIndex + 1, "next");
    });

    // Close lightbox
    const closeLightbox = () => {
      gsap.to(lbImg, {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          lightbox.classList.remove("active");
          document.body.style.overflow = "";
          lbImg.src = "";
        },
      });
    };

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showSlide(lbIndex - 1, "prev");
      if (e.key === "ArrowRight") showSlide(lbIndex + 1, "next");
    });

    // Touch swipe in lightbox
    let lbTouchStart = 0;
    let lbTouchDelta = 0;
    lbImg.addEventListener("touchstart", (e) => { lbTouchStart = e.touches[0].clientX; }, { passive: true });
    lbImg.addEventListener("touchmove", (e) => { lbTouchDelta = e.touches[0].clientX - lbTouchStart; }, { passive: true });
    lbImg.addEventListener("touchend", () => {
      if (lbTouchDelta > 50) showSlide(lbIndex - 1, "prev");
      else if (lbTouchDelta < -50) showSlide(lbIndex + 1, "next");
      lbTouchDelta = 0;
    });
  }

  // ==================== POPUP BIENVENIDA ====================
  const popupOverlay = document.getElementById("popupOverlay");
  const popupClose = document.getElementById("popupClose");

  if (popupOverlay && popupClose) {
    // Show popup after 3 seconds if not already dismissed this session
    if (!sessionStorage.getItem("popupDismissed")) {
      setTimeout(() => {
        popupOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }, 3000);
    }

    const closePopup = () => {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
      sessionStorage.setItem("popupDismissed", "true");
    };

    popupClose.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) closePopup();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popupOverlay.classList.contains("active")) closePopup();
    });
  }

  // ==================== FORM HANDLING ====================
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Loading state
      btn.textContent = "Enviando...";
      btn.disabled = true;
      btn.style.opacity = "0.6";

      // Simulate submission
      setTimeout(() => {
        btn.textContent = "Enviado!";
        btn.style.background = "var(--sage-dark)";

        gsap.from(btn, {
          scale: 0.95,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.opacity = "";
          btn.style.background = "";
          form.reset();
        }, 2000);
      }, 1200);
    });
  }
});
