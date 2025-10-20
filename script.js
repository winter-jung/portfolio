// GSAP Animations and Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Custom cursor initialization
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add active class on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .hire-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero section animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5")
        .to('.hire-btn', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");

    // Scroll-triggered animations
    gsap.utils.toArray('.about-text,  .why-best-text, .skills').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Service items animation
    gsap.utils.toArray('.service-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));

        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            onUpdate: function () {
                stat.textContent = Math.ceil(stat.textContent);
            }
        });
    });

    // Portfolio items hover effect
    gsap.utils.toArray('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Testimonial slider
    let currentSlide = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        // Hide all slides
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                gsap.fromTo(item,
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
                );
            } else {
                item.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);

    // Pricing cards animation
    gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Contact form animation and handling
    gsap.from('.contact-form', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from('.contact-info', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-info',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const statusSubmitting = document.querySelector('.status-submitting');
    const statusError = document.querySelector('.status-error');
    const statusSuccess = document.querySelector('.status-success');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show submitting status
        statusSubmitting.style.display = 'block';
        statusError.style.display = 'none';
        statusSuccess.style.display = 'none';

        // Simulate form submission
        setTimeout(() => {
            statusSubmitting.style.display = 'none';
            statusSuccess.style.display = 'block';

            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                statusSuccess.style.display = 'none';
            }, 3000);
        }, 2000);
    });

    // Floating animation for skill items
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
        gsap.to(item, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
        });
    });

    // Parallax effect for hero section
    gsap.to('.hero-bg', {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.hire-btn, .services-btn, .order-btn, .view-all-btn, .submit-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Section reveal animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

// Loading animation
window.addEventListener('load', function () {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Initialize body opacity
gsap.set('body', { opacity: 0 });

// h1::before 애니메이션: 작게 시작해서 회전하면서 커지고, 커지면 회전 멈춤
(() => {
  // 연속 회전 트윈: CSS 변수에 +=360deg로 계속 회전시킴
  const rotationTween = gsap.to('.hero-title', {
    '--before-rotate': '+=360deg',
    duration: 1,           // 1초에 한 바퀴
    repeat: -1,
    ease: 'linear'
  });

  // 스케일 트윈: 작게 시작해서 커지며 완료되면 회전 트윈 종료
  gsap.fromTo('.hero-title',
    { '--before-scale': '0.2' },
    {
      '--before-scale': '1',
      duration: 1.5,
      ease: 'power3.out',
      onComplete() {
        // 회전 멈추기: 반복 트윈 종료 후 현재 회전 값을 적절히 정렬(옵션)
        rotationTween.kill();
        // 선택사항: 멈춘 상태를 자연스럽게 0deg로 맞추려면 아래와 같이 설정
        gsap.to('.hero-title', { '--before-rotate': '45deg', duration: 0.4, ease: 'power2.out' });
      }
    }
  );
})();