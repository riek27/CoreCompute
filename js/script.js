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

// Particle Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle canvas
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(100, 150, 255, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
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
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 - distance/500})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // GPU Job Simulation
    const jobForm = document.getElementById('job-form');
    const consoleOutput = document.getElementById('console-output');
    const consoleContent = consoleOutput.querySelector('.console-content');
    const runJobBtn = document.getElementById('run-job-btn');
    const jobCompleteCard = document.getElementById('job-complete-card');
    const runAnotherBtn = document.getElementById('run-another-btn');
    const creditSlider = document.getElementById('credits');
    const creditValue = document.getElementById('credit-value');
    
    // Update credit value display
    creditSlider.addEventListener('input', function() {
        creditValue.textContent = this.value;
    });
    
    // Job simulation logs
    const simulationLogs = [
        { text: "[INFO] Initializing job configuration...", delay: 500, type: "info" },
        { text: "[INFO] Validating model parameters...", delay: 1000, type: "info" },
        { text: "[INFO] Allocating GPU resources...", delay: 1500, type: "info" },
        { text: "[SUCCESS] Connected to Node #102 (Berlin)", delay: 2000, type: "success" },
        { text: "[SUCCESS] Connected to Node #245 (Tokyo)", delay: 2500, type: "success" },
        { text: "[SUCCESS] Connected to Node #387 (San Francisco)", delay: 3000, type: "success" },
        { text: "[INFO] Uploading dataset...", delay: 3500, type: "info" },
        { text: "[INFO] Initializing model training...", delay: 4000, type: "info" },
        { text: "[INFO] Epoch 1/10 - Loss: 1.2456", delay: 4500, type: "info" },
        { text: "[INFO] Epoch 3/10 - Loss: 0.8765", delay: 5000, type: "info" },
        { text: "[INFO] Epoch 6/10 - Loss: 0.4321", delay: 5500, type: "info" },
        { text: "[INFO] Epoch 9/10 - Loss: 0.1234", delay: 6000, type: "info" },
        { text: "[SUCCESS] Model training completed", delay: 6500, type: "success" },
        { text: "[INFO] Running validation...", delay: 7000, type: "info" },
        { text: "[RESULT] Inference time: 2.5s | Accuracy: 98.6%", delay: 7500, type: "result" },
        { text: "[METRICS] GPU nodes used: 3 | Credits spent: 20 | Cost saved: 65%", delay: 8000, type: "metrics" }
    ];
    
    // Add log line to console
    function addLogLine(text, type = "info") {
        const logLine = document.createElement('div');
        logLine.className = `console-line ${type}`;
        logLine.textContent = text;
        consoleContent.appendChild(logLine);
        consoleContent.scrollTop = consoleContent.scrollHeight;
    }
    
    // Clear console
    function clearConsole() {
        consoleContent.innerHTML = '';
    }
    
    // Update console status
    function updateConsoleStatus(status, type = "ready") {
        const statusElement = consoleOutput.querySelector('.console-status');
        statusElement.textContent = status;
        statusElement.className = `console-status ${type}`;
    }
    
    // Run job simulation
    function runJobSimulation() {
        // Get form values
        const framework = document.getElementById('framework').value;
        const modelType = document.getElementById('model-type').value;
        const gpuTier = document.getElementById('gpu-tier').value;
        const jobName = document.getElementById('job-name').value;
        const credits = document.getElementById('credits').value;
        
        // Disable form and button
        jobForm.classList.add('disabled');
        runJobBtn.disabled = true;
        runJobBtn.textContent = 'Running...';
        
        // Update console status
        updateConsoleStatus('Running', 'running');
        
        // Clear console
        clearConsole();
        
        // Add initial log
        addLogLine(`[INFO] Starting job: ${jobName}`);
        addLogLine(`[INFO] Framework: ${framework} | Model: ${modelType} | GPU Tier: ${gpuTier}`);
        
        // Simulate job execution with logs
        let delay = 0;
        simulationLogs.forEach(log => {
            setTimeout(() => {
                addLogLine(log.text, log.type);
                
                // If this is the last log, show completion
                if (log === simulationLogs[simulationLogs.length - 1]) {
                    setTimeout(() => {
                        jobCompleteCard.style.display = 'block';
                        updateConsoleStatus('Completed', 'completed');
                    }, 500);
                }
            }, log.delay);
            delay = log.delay;
        });
    }
    
    // Reset simulation
    function resetSimulation() {
        jobForm.classList.remove('disabled');
        runJobBtn.disabled = false;
        runJobBtn.textContent = 'Run Simulation';
        jobCompleteCard.style.display = 'none';
        updateConsoleStatus('Ready', 'ready');
        clearConsole();
        addLogLine('[INFO] Configure your job and click "Run Simulation" to begin');
    }
    
    // Event listeners
    jobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        runJobSimulation();
    });
    
    runAnotherBtn.addEventListener('click', resetSimulation);
    
    // Analytics Counters
    const gpuNodes = document.getElementById('gpu-nodes');
    const jobsCompleted = document.getElementById('jobs-completed');
    const creditsDistributed = document.getElementById('credits-distributed');
    const networkUptime = document.getElementById('network-uptime');
    
    // Animate counters
    function animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            
            if (element === networkUptime) {
                element.textContent = `${Math.floor(current)}%`;
            } else if (element === creditsDistributed) {
                element.textContent = `${Math.floor(current).toLocaleString()}+`;
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Create sparklines
    function createSparkline(element, data) {
        const width = 80;
        const height = 30;
        const max = Math.max(...data);
        
        let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
        svg += `<path d="M0,${height - (data[0]/max)*height} `;
        
        data.forEach((point, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (point / max) * height;
            svg += `L${x},${y} `;
        });
        
        svg += `" fill="none" stroke="rgba(100, 150, 255, 0.7)" stroke-width="2" />`;
        svg += `</svg>`;
        
        element.innerHTML = svg;
    }
    
    // Initialize analytics when section comes into view
    const analyticsSection = document.querySelector('.analytics-section');
    let analyticsInitialized = false;
    
    function initAnalytics() {
        if (analyticsInitialized) return;
        
        // Animate counters
        animateCounter(gpuNodes, 1247);
        animateCounter(jobsCompleted, 8923);
        animateCounter(creditsDistributed, 154820);
        animateCounter(networkUptime, 99.8);
        
        // Create sparklines
        createSparkline(document.getElementById('gpu-sparkline'), [10, 15, 12, 18, 22, 25, 30, 28, 32, 35]);
        createSparkline(document.getElementById('jobs-sparkline'), [50, 65, 70, 80, 75, 85, 90, 95, 100, 110]);
        createSparkline(document.getElementById('credits-sparkline'), [1000, 1200, 1500, 1300, 1600, 1800, 2000, 2200, 2400, 2600]);
        createSparkline(document.getElementById('uptime-sparkline'), [98, 99, 99.5, 99.2, 99.7, 99.8, 99.9, 99.8, 99.9, 99.8]);
        
        analyticsInitialized = true;
    }
    
    // Intersection Observer for analytics section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initAnalytics();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(analyticsSection);
    
    // Waitlist Form
    const waitlistForm = document.getElementById('waitlist-form');
    const waitlistSuccess = document.getElementById('waitlist-success');
    const waitlistSubmit = document.getElementById('waitlist-submit');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('waitlist-name');
        const nameError = document.getElementById('name-error');
        if (name.value.trim().length < 2) {
            nameError.textContent = 'Please enter your full name';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const email = document.getElementById('waitlist-email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        return isValid;
    }
    
    // Waitlist form submission
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Show loading state
        waitlistSubmit.disabled = true;
        waitlistSubmit.textContent = 'Submitting...';
        
        // Simulate form submission
        setTimeout(() => {
            // In a real implementation, this would be the FormCarry submission
            // For demo purposes, we'll just show success
            
            // Hide form and show success message
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'block';
            
            // Trigger confetti effect
            triggerConfetti();
        }, 1500);
    });
    
    // Confetti effect
    function triggerConfetti() {
        const confettiCount = 100;
        const confettiContainer = document.querySelector('.waitlist-container');
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .form-group input, .form-group select, .form-group textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile menu toggle (if not already implemented)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

