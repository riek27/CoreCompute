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

// script.js for HyperAstraAI Demo Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticleBackground();
    initMobileNavigation();
    initJobSimulation();
    initAnalyticsCounters();
    initWaitlistForm();
    initScrollAnimations();
});

// =============================================
// PARTICLE BACKGROUND ANIMATION
// =============================================
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(100, 150, 255, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                const dx = this.x - particles[i].x;
                const dy = this.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
}

// =============================================
// MOBILE NAVIGATION TOGGLE
// =============================================
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// =============================================
// JOB SIMULATION FUNCTIONALITY
// =============================================
function initJobSimulation() {
    const jobForm = document.getElementById('job-form');
    const consoleOutput = document.getElementById('console-output');
    const runJobBtn = document.getElementById('run-job-btn');
    const jobCompleteCard = document.getElementById('job-complete-card');
    const runAnotherBtn = document.getElementById('run-another-btn');
    const clearConsoleBtn = document.getElementById('clear-console');
    const creditsSlider = document.getElementById('credits');
    const creditsValue = document.getElementById('credits-value');
    const runDemoBtn = document.getElementById('run-demo-btn');
    
    // Update credits value display
    if (creditsSlider && creditsValue) {
        creditsSlider.addEventListener('input', function() {
            creditsValue.textContent = this.value;
        });
    }
    
    // Clear console
    if (clearConsoleBtn) {
        clearConsoleBtn.addEventListener('click', function() {
            clearConsole();
        });
    }
    
    // Run demo button
    if (runDemoBtn) {
        runDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('.simulation-section');
            
            // Auto-fill form with demo values
            setTimeout(() => {
                document.getElementById('framework').value = 'pytorch';
                document.getElementById('model-type').value = 'vision';
                document.getElementById('gpu-tier').value = 'mid';
                document.getElementById('job-name').value = 'Image Classification Demo';
                document.getElementById('credits').value = '25';
                document.getElementById('credits-value').textContent = '25';
                
                // Trigger form submission after a brief delay
                setTimeout(() => {
                    jobForm.dispatchEvent(new Event('submit'));
                }, 1000);
            }, 500);
        });
    }
    
    // Run another job
    if (runAnotherBtn) {
        runAnotherBtn.addEventListener('click', function() {
            resetSimulation();
        });
    }
    
    // Job form submission
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            runJobSimulation();
        });
    }
    
    // Run the job simulation
    function runJobSimulation() {
        // Get form values
        const framework = document.getElementById('framework').value;
        const modelType = document.getElementById('model-type').value;
        const gpuTier = document.getElementById('gpu-tier').value;
        const jobName = document.getElementById('job-name').value;
        const credits = document.getElementById('credits').value;
        
        // Validate form
        if (!framework || !modelType || !gpuTier || !jobName) {
            addConsoleLine('error', '[ERROR] Please fill in all required fields');
            return;
        }
        
        // Disable form and show loading state
        setFormDisabled(true);
        clearConsole();
        
        // Start simulation with delays between steps
        setTimeout(() => addConsoleLine('info', `[INFO] Starting job: ${jobName}`), 500);
        setTimeout(() => addConsoleLine('info', '[INFO] Validating job parameters...'), 1000);
        setTimeout(() => addConsoleLine('success', '[SUCCESS] Parameters validated'), 1500);
        setTimeout(() => addConsoleLine('info', '[INFO] Searching for available GPU nodes...'), 2000);
        
        // Simulate node allocation with random location
        const locations = ['Frankfurt', 'Tokyo', 'San Francisco', 'Singapore', 'London', 'Sydney'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const nodeId = Math.floor(Math.random() * 900) + 100;
        
        setTimeout(() => addConsoleLine('info', `[INFO] Allocating GPU node #${nodeId} (${randomLocation})...`), 3000);
        setTimeout(() => addConsoleLine('success', `[SUCCESS] Connected to Node #${nodeId}`), 3500);
        setTimeout(() => addConsoleLine('info', '[INFO] Uploading dataset and model...'), 4000);
        setTimeout(() => addConsoleLine('success', '[SUCCESS] Data transfer complete'), 4500);
        setTimeout(() => addConsoleLine('info', '[INFO] Running model on distributed GPU cluster...'), 5000);
        
        // Simulate processing with progress
        simulateProgress(5500, 8000);
        
        // Show completion and results
        setTimeout(() => {
            addConsoleLine('success', '[SUCCESS] Job completed successfully ✅');
            showJobResults();
            setFormDisabled(false);
        }, 8500);
    }
    
    // Simulate progress in console
    function simulateProgress(startTime, endTime) {
        const steps = 5;
        const interval = (endTime - startTime) / steps;
        
        for (let i = 1; i <= steps; i++) {
            setTimeout(() => {
                const percent = (i / steps) * 100;
                addConsoleLine('system', `[PROGRESS] Training: ${percent.toFixed(0)}% complete`);
            }, startTime + (i * interval));
        }
    }
    
    // Show job results
    function showJobResults() {
        if (!jobCompleteCard) return;
        
        // Generate realistic results based on form inputs
        const framework = document.getElementById('framework').value;
        const modelType = document.getElementById('model-type').value;
        const gpuTier = document.getElementById('gpu-tier').value;
        const credits = parseInt(document.getElementById('credits').value);
        
        // Set result values
        document.getElementById('result-time').textContent = generateInferenceTime(gpuTier, modelType);
        document.getElementById('result-accuracy').textContent = generateAccuracy(modelType);
        document.getElementById('result-nodes').textContent = generateNodeCount(gpuTier, credits);
        document.getElementById('result-credits').textContent = credits;
        document.getElementById('result-savings').textContent = generateCostSavings(gpuTier);
        
        // Show results card
        jobCompleteCard.style.display = 'block';
        
        // Scroll to results
        setTimeout(() => {
            jobCompleteCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
    
    // Generate realistic inference time based on GPU tier and model type
    function generateInferenceTime(gpuTier, modelType) {
        const baseTimes = {
            'entry': { 'vision': 4.2, 'nlp': 5.8, 'generative': 8.5, 'reinforcement': 7.2 },
            'mid': { 'vision': 2.5, 'nlp': 3.2, 'generative': 5.1, 'reinforcement': 4.3 },
            'high': { 'vision': 1.2, 'nlp': 1.5, 'generative': 2.8, 'reinforcement': 2.1 },
            'cluster': { 'vision': 0.8, 'nlp': 0.9, 'generative': 1.5, 'reinforcement': 1.2 }
        };
        
        const time = baseTimes[gpuTier]?.[modelType] || 3.5;
        return `${time.toFixed(1)}s`;
    }
    
    // Generate realistic accuracy based on model type
    function generateAccuracy(modelType) {
        const accuracies = {
            'vision': '98.6%',
            'nlp': '96.2%',
            'generative': '94.8%',
            'reinforcement': '92.1%'
        };
        
        return accuracies[modelType] || '95.5%';
    }
    
    // Generate node count based on GPU tier and credits
    function generateNodeCount(gpuTier, credits) {
        const multipliers = {
            'entry': 1,
            'mid': 2,
            'high': 3,
            'cluster': 5
        };
        
        const baseNodes = Math.max(1, Math.floor(credits / 10));
        return baseNodes * (multipliers[gpuTier] || 1);
    }
    
    // Generate cost savings percentage
    function generateCostSavings(gpuTier) {
        const savings = {
            'entry': '45%',
            'mid': '60%',
            'high': '70%',
            'cluster': '75%'
        };
        
        return savings[gpuTier] || '55%';
    }
    
    // Reset simulation to initial state
    function resetSimulation() {
        if (jobCompleteCard) {
            jobCompleteCard.style.display = 'none';
        }
        
        clearConsole();
        addConsoleLine('system', '[SYSTEM] Ready to run AI compute simulation...');
        addConsoleLine('system', '[SYSTEM] Select parameters and click "Run Simulation"');
        
        // Scroll to form
        setTimeout(() => {
            document.querySelector('.simulation-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
    
    // Add a line to the console
    function addConsoleLine(type, text) {
        if (!consoleOutput) return;
        
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = text;
        
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    
    // Clear the console
    function clearConsole() {
        if (consoleOutput) {
            consoleOutput.innerHTML = '';
        }
    }
    
    // Enable/disable form during simulation
    function setFormDisabled(disabled) {
        const formElements = jobForm.querySelectorAll('input, select, button');
        const btnText = runJobBtn.querySelector('.btn-text');
        const btnLoading = runJobBtn.querySelector('.btn-loading');
        
        formElements.forEach(element => {
            if (element !== runJobBtn) {
                element.disabled = disabled;
            }
        });
        
        if (disabled) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            runJobBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            runJobBtn.disabled = false;
        }
    }
}

// =============================================
// ANALYTICS COUNTERS
// =============================================
function initAnalyticsCounters() {
    const counters = {
        'gpu-nodes': 2458,
        'jobs-completed': 14900,
        'credits-distributed': 2300000,
        'network-uptime': 99.9
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Object.keys(counters).forEach(id => {
                    animateCounter(id, counters[id]);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const analyticsSection = document.querySelector('.analytics-section');
    if (analyticsSection) {
        observer.observe(analyticsSection);
    }
}

// Animate counter from 0 to target value
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000; // 2 seconds
    const step = 20; // update every 20ms
    const totalSteps = duration / step;
    const increment = targetValue / totalSteps;
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        // Format numbers with commas
        if (elementId === 'credits-distributed') {
            element.textContent = formatNumber(currentValue);
        } else if (elementId === 'network-uptime') {
            element.textContent = `${currentValue.toFixed(1)}%`;
        } else {
            element.textContent = formatNumber(Math.floor(currentValue));
        }
    }, step);
}

// Format numbers with commas
function formatNumber(num) {
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =============================================
// WAITLIST FORM FUNCTIONALITY
// =============================================
function initWaitlistForm() {
    const waitlistForm = document.getElementById('waitlist-form');
    const waitlistSuccess = document.getElementById('waitlist-success');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitWaitlistForm();
        });
    }
}

// Submit waitlist form to FormCarry
function submitWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const waitlistSuccess = document.getElementById('waitlist-success');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit to FormCarry
    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            form.style.display = 'none';
            waitlistSuccess.style.display = 'block';
            
            // Add confetti effect
            createConfetti();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Show error message
        alert('Sorry, there was an error submitting the form. Please try again later.');
        console.error('Form submission error:', error);
        
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// Create confetti effect for form success
function createConfetti() {
    const colors = ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random() * 0.5 + 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        // Remove confetti after animation
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
function initScrollAnimations() {
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.workflow-step, .analytics-card, .glass-card').forEach(el => {
        observer.observe(el);
    });
}

// =============================================
// UTILITY FUNCTIONS
// =============================================
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add CSS for animations
function injectStyles() {
    const styles = `
        .console-line {
            margin-bottom: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.4;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
        }
        
        .console-line.info {
            color: #4facfe;
        }
        
        .console-line.success {
            color: #43e97b;
        }
        
        .console-line.error {
            color: #ff6b6b;
        }
        
        .console-line.system {
            color: #a0a0a0;
        }
        
        .console-line.warning {
            color: #ffd93d;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        .confetti {
            pointer-events: none;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .btn--glow {
            box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
            transition: box-shadow 0.3s ease;
        }
        
        .btn--glow:hover {
            box-shadow: 0 0 30px rgba(79, 172, 254, 0.8);
        }
        
        .btn--pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(79, 172, 254, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(79, 172, 254, 0);
            }
        }
        
        .glass-card {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Inject styles when DOM is loaded
document.addEventListener('DOMContentLoaded', injectStyles);
