// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle (for smaller screens)
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav');
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        // Only add the menu toggle if it doesn't exist yet and if we're on a small screen
        if (window.innerWidth <= 768 && !document.querySelector('.menu-toggle')) {
            document.querySelector('header .container').prepend(menuToggle);
            nav.classList.add('mobile-hidden');

            menuToggle.addEventListener('click', function () {
                nav.classList.toggle('mobile-hidden');
                if (nav.classList.contains('mobile-hidden')) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                }
            });
        } else if (window.innerWidth > 768) {
            // Remove menu toggle if screen is resized larger
            const existingToggle = document.querySelector('.menu-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
            nav.classList.remove('mobile-hidden');
        }
    };

    // Call once on load
    setupMobileMenu();

    // And call again if window is resized
    window.addEventListener('resize', setupMobileMenu);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Improved animation - Ensure elements are always visible
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .intro h2, .intro p, .hero-content h1, .hero-content h2');

        // Immediately make all elements visible
        elements.forEach(element => {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });

        // Then apply animation classes
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                if (!element.classList.contains('animate')) {
                    element.classList.add('animate');
                }
            }
        });
    };

    // Add animation class to CSS with improved visibility
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .intro h2, .intro p, .hero-content h1, .hero-content h2 {
            opacity: 1 !important; /* Always fully visible */
            transform: translateY(20px);
            transition: transform 0.6s ease;
        }
        
        .visible {
            opacity: 1 !important; /* Ensure visibility */
            display: block !important; /* Make sure it's displayed */
        }
        
        .animate {
            transform: translateY(0);
        }
        
        .mobile-hidden {
            display: none;
        }
        
        .menu-toggle {
            cursor: pointer;
            font-size: 1.5rem;
        }
        
        @media (max-width: 768px) {
            nav.mobile-hidden {
                display: none;
            }
            
            nav {
                width: 100%;
                padding: 20px 0;
            }
            
            nav ul {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);

    // Call immediately on load
    animateOnScroll();

    // And call again on scroll
    window.addEventListener('scroll', animateOnScroll);
}); 