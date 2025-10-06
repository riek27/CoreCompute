// Main JavaScript file for HyperlumeAI

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Floating background animation for home page
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        let xPos = 0;
        let yPos = 0;
        let xDirection = 1;
        let yDirection = 1;
        const speed = 0.2;
        
        function animateBackground() {
            // Update position
            xPos += speed * xDirection;
            yPos += speed * yDirection;
            
            // Change direction when reaching edges
            if (xPos > 10 || xPos < -10) {
                xDirection *= -1;
            }
            
            if (yPos > 10 || yPos < -10) {
                yDirection *= -1;
            }
            
            // Apply transformation
            heroBg.style.transform = `translate(${xPos}px, ${yPos}px)`;
            
            // Continue animation
            requestAnimationFrame(animateBackground);
        }
        
        // Start animation
        animateBackground();
    }
    
    // Waitlist form submission
    const waitlistForm = document.getElementById('waitlist-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(waitlistForm);
            const email = formData.get('email');
            
            // Simple validation
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Submit to FormCarry
            fetch('https://formcarry.com/s/1PxT7awBYpx', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    // Show thank you message
                    waitlistForm.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                } else {
                    alert('There was an error submitting the form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            });
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(28, 28, 46, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(28, 28, 46, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat, .pricing-card, .workflow-step');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});
