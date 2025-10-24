// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.querySelectorAll('.nav-menu a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      gsap.to(window, {
        duration: 0.6, // 더 빠르게
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power2.inOut",
      });
    }
  });
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set initial states for elements
  gsap.set([".hero-greeting", ".hero-title", ".hero-subtitle", ".info-item", ".btn", ".hero-img-main", ".hero-img-texture", ".section-title", ".section-description", ".timeline-item", ".project-card", ".contact-info", ".contact-social"], {
    opacity: 1,
  });

  // Hero Section Animations
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
  });

  heroTimeline
    .from(".hero-greeting", {
      y: 50,
      opacity: 0,
      duration: 0.8,
    })
    .from(
      ".hero-title",
      {
        y: 80,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    )
    .from(
      ".hero-subtitle",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6"
    )
    .from(
      ".info-item",
      {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      },
      "-=0.4"
    )
    .to(
      ".hero-img-main",
      {
        x: 100,
        opacity: 1,
        duration: 1.2,
      },
      "-=1.2"
    )
    .from(
      ".hero-img-texture",
      {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
      },
      "-=1"
    );

  // Skills Section - Animated Progress Bars
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");

    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      width: progress + "%",
      duration: 1.5,
      ease: "power2.out",
    });
  });

  // Section Titles Animation
  const sectionTitles = document.querySelectorAll(".section-title");

  sectionTitles.forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Section Descriptions Animation
  const sectionDescriptions = document.querySelectorAll(".section-description");

  sectionDescriptions.forEach((desc) => {
    gsap.from(desc, {
      scrollTrigger: {
        trigger: desc,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Timeline Items Animation
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Project Cards Animation
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        gsap.to(stat, {
          innerHTML: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            stat.innerHTML = Math.ceil(stat.innerHTML).toLocaleString();
          },
        });
      },
      once: true,
    });
  });

  // Service Cards Animation
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Contact Section Animation
  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Parallax Effect for Hero Image Texture
  gsap.to(".hero-img-texture", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: 100,
    rotation: 15,
    ease: "none",
  });

  // Logo Carousel - Create duplicate for infinite scroll
  const logoTrack = document.querySelector(".logo-track");
  if (logoTrack) {
    const logos = logoTrack.innerHTML;
    logoTrack.innerHTML += logos; // Duplicate logos for seamless loop
  }

  // Skill Items Hover Effect
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item.querySelector(".skill-progress"), {
        opacity: 0.8,
        duration: 0.3,
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item.querySelector(".skill-progress"), {
        opacity: 1,
        duration: 0.3,
      });
    });
  });


  // Refresh ScrollTrigger on window resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
