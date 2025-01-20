document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-mode');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    });

    // Initialize all components
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initContactForm();
    initParticles();
});

// Mobile Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Typing effect for the subtitle
function initTypingEffect() {
    const text = "I'm Sizwe Ramokhali, crafting digital solutions for tomorrow.";
    const typingText = document.querySelector('.typing-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    // Clear and start typing
    if (typingText) {
        typingText.textContent = '';
        setTimeout(type, 1000);
    }
}

// Scroll animations for sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.about-card, .service-card');

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe sections
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Intersection Observer for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe cards
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('card-hidden');
        cardObserver.observe(card);
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual form submission)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Particle background effect
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and animation duration
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = 3 + Math.random() * 5 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Add some CSS for new animations
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s;
    }
    
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .card-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.5s ease-out;
    }
    
    .card-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background: var(--primary-color);
        color: var(--dark-bg);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.error {
        background: #ff4444;
        color: white;
    }
    
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: float linear infinite;
        opacity: 0.5;
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.95);
            padding: 1rem;
            backdrop-filter: blur(10px);
        }
    }
`;

document.head.appendChild(style);
