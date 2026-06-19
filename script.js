document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Remove Preloader
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.visibility = "hidden", 500);
    });
    // Fallback for load absolute complete state
    setTimeout(() => { if(preloader) preloader.style.display = "none"; }, 2500);

    // 2. Interactive Light/Dark Theme Controller
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const themeIcon = themeToggle.querySelector("i");

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        body.classList.toggle("dark-theme");
        if(body.classList.contains("light-theme")) {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    });

    // 3. Mobile Responsive Navigation Menu
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // 4. Sticky Header Configuration
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if(window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // 5. Intelligent Typing Text Animation Array Engine
    const words = ["Software Engineer.", "Frontend Architect.", "Full Stack Innovator."];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    const typingSpan = document.getElementById("typing-text");

    function typeMachine() {
        let currentWord = words[wordIdx];
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIdx === currentWord.length) {
            typeSpeed = 1800; // Hold at full text string
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typeSpeed = 400; // Breath buffer before typing next line
        }
        setTimeout(typeMachine, typeSpeed);
    }
    if(typingSpan) typeMachine();

    // 6. Scroll Reveal Logic & Skill Bar Animations 
    const scrollElements = document.querySelectorAll(".scroll-reveal");
    const skillBars = document.querySelectorAll(".progress");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add("active");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });

        // Trigger dynamic metrics inside bars when skills sector turns active
        skillBars.forEach((bar) => {
            if (elementInView(bar.parentElement, 1.0)) {
                bar.style.width = bar.getAttribute("data-progress");
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Pre-trigger on load checking initial sections

    // 7. Active Navigation Link Syncing during scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if(pageYOffset >= sectionTop - 120) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if(item.getAttribute("href").includes(currentSectionId)) {
                item.classList.add("active");
            }
        });
    });

    // 8. Scroll to Top Display Layer Toggle
    const scrollToTopBtn = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 400) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });
    scrollToTopBtn.addEventListener("click", () => window.scrollTo(0, 0));

    // 9. Particle Background Canvas Engine Setup
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = Math.random() * 0.6 - 0.3;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            // Evaluated color adapts directly via text metrics inside themes dynamically
            const isLight = document.body.classList.contains("light-theme");
            ctx.fillStyle = isLight ? "rgba(37, 99, 235, 0.15)" : "rgba(168, 85, 247, 0.2)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
        for(let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    window.addEventListener('resize', initParticles);

    // 10. Contact Form Submissions Interceptor Sandbox
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for connecting, Ambrish Mishra will reach out to you shortly!");
        form.reset();
    });
});