// ===== FOY PILATES — script.js =====
// GSAP Core + ScrollTrigger animations

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ==================== NAV ====================
  const nav = document.querySelector("nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Shrink nav on scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

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

      // Service cards — batch reveal with stagger
      ScrollTrigger.batch(".srv", {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 50,
            autoAlpha: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        start: "top 85%",
        once: true,
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

      schTl.from(".sch-left", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
      });

      schTl.from(
        ".sch-table tr",
        {
          x: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
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

      // ==================== GALLERY SECTION ====================
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

      // Gallery items — staggered scale-in
      ScrollTrigger.batch(".gi", {
        onEnter: (elements) => {
          gsap.from(elements, {
            scale: 0.9,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        start: "top 85%",
        once: true,
      });

      // Gallery parallax on images (desktop only)
      if (isDesktop) {
        document.querySelectorAll(".gi img").forEach((img) => {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".gi"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

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
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      gsap.to(window, {
        scrollTo: { y: targetTop, autoKill: true },
        duration: 1,
        ease: "power2.inOut",
      });
    });
  });

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
