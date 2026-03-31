// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Prevent right-click, copy, and content theft
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Prevent text selection via keyboard
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Prevent copy via keyboard shortcuts
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

// Prevent cut via keyboard shortcuts
document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// Prevent keyboard shortcuts for copying
document.addEventListener('keydown', (e) => {
    // Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (
        (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 88 || e.keyCode === 65 || e.keyCode === 85)) || // C, X, A, U
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // I, J, C
        (e.ctrlKey && e.keyCode === 83) // S (save page)
    ) {
        e.preventDefault();
        return false;
    }
});

// Prevent image dragging
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-theme');
} else {
    body.classList.add('dark-theme');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Active nav link on scroll & Navbar scroll effect
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let current = '';

    // Active link tracking
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = body.classList.contains('dark-theme')
            ? 'rgba(26, 26, 46, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        navbar.style.background = body.classList.contains('dark-theme')
            ? '#1a1a2e'
            : '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Smooth scroll animation for internal links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(section);
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add click animation to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add skill tag click animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Parallax effect for header background
let headerElement = document.querySelector('.header');
if (headerElement) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        if (headerElement.querySelector('::before')) {
            headerElement.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add cursor trail effect for premium feel
const createCursorTrail = () => {
    let dots = [];
    const maxDots = 12;

    document.addEventListener('mousemove', (e) => {
        if (dots.length > maxDots) {
            const oldDot = dots.shift();
            oldDot.remove();
        }

        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(201, 169, 97, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(dot);
        dots.push(dot);

        setTimeout(() => {
            dot.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            dot.remove();
        }, 600);
    });
};

// Uncomment to enable cursor trail (optional premium effect)
// createCursorTrail();

// Add print functionality
const addPrintButton = () => {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Resume
    `;
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-3px)';
        printBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });

    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0)';
        printBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });

    printBtn.addEventListener('click', () => {
        window.print();
    });

    document.body.appendChild(printBtn);
};

// Add print button
// addPrintButton(); // Removed print button

// Performance optimization: Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
