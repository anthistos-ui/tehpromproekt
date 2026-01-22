// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Reset previous errors
            this.querySelectorAll('.error').forEach(el => el.remove());
            
            if (!name.value.trim()) {
                showError(name, 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                showError(email, 'Пожалуйста, введите корректный email');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Пожалуйста, введите сообщение');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
                this.reset();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.textContent = '☰';
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Helper functions
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = '#e74c3c';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '5px';
        error.textContent = message;
        
        input.parentNode.appendChild(error);
        input.style.borderColor = '#e74c3c';
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
            if (error.parentNode === this.parentNode) {
                this.parentNode.removeChild(error);
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add water animation class to body
    document.body.classList.add('water-animation');
});