document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME AND CONTENT SWITCHING ---
    const dynamicHeadline = document.getElementById('dynamic-headline');
    const dynamicCtaHeadline = document.getElementById('dynamic-cta-headline');
    let currentTheme = '';

    function setDynamicContent(theme) {
        switch (theme) {
            case 'theme-morning':
                dynamicHeadline.textContent = "Good Morning. Ready to Own Your Day?";
                dynamicCtaHeadline.textContent = "Your Best Day Starts Now.";
                break;
            case 'theme-afternoon':
                dynamicHeadline.textContent = "Hit Your Stride. We'll Keep You on Track.";
                dynamicCtaHeadline.textContent = "Don't Wait for Tomorrow. Improve Today.";
                break;
            case 'theme-evening':
                dynamicHeadline.textContent = "The Day is Done. Let's Focus on You.";
                dynamicCtaHeadline.textContent = "Invest in a Better Tomorrow, Tonight.";
                break;
            case 'theme-night':
                dynamicHeadline.textContent = "Your Peace of Mind is Our Priority.";
                dynamicCtaHeadline.textContent = "Ready for a Peaceful Night and Brighter Morning?";
                break;
        }
    }

    function setTheme() {
        const hour = new Date().getHours();
        let newTheme = '';

        if (hour >= 5 && hour < 12) {
            newTheme = 'theme-morning';
        } else if (hour >= 12 && hour < 17) {
            newTheme = 'theme-afternoon';
        } else if (hour >= 17 && hour < 22) {
            newTheme = 'theme-evening';
        } else {
            newTheme = 'theme-night';
        }

        if (newTheme !== currentTheme) {
            document.body.className = newTheme;
            currentTheme = newTheme;
            setDynamicContent(newTheme);
        }
    }


    // --- 2. LOTTIE ANIMATIONS INITIALIZATION ---
    function initLottie() {
        lottie.loadAnimation({
            container: document.getElementById('lottie-morning'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets4.lottiefiles.com/packages/lf20_hgkr6pbn.json' // Sun animation
        });
        lottie.loadAnimation({
            container: document.getElementById('lottie-afternoon'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets1.lottiefiles.com/packages/lf20_qcrbuchc.json' // Focus/target animation
        });
        lottie.loadAnimation({
            container: document.getElementById('lottie-evening'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets9.lottiefiles.com/packages/lf20_z1w1gdsv.json' // Relax/meditation animation
        });
    }

    // --- 3. GSAP SCROLL ANIMATIONS ---
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Animate hero content on load
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Animate sections on scroll
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.from(section.querySelectorAll('.container > *'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });

        // Parallax effect for testimonial cards
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card, { y: 0 }, {
                y: (i % 2 === 0) ? -30 : 30,
                scrollTrigger: {
                    trigger: '.testimonials',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
    }

    // --- 4. INITIALIZATION CALLS ---
    setTheme();
    initLottie();
    initScrollAnimations();
    
    // Check the time periodically to update the theme if the user stays on the page for a long time
    setInterval(setTheme, 60000); // Check every minute
});
