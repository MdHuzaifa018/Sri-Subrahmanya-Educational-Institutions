// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const courseCards = document.querySelectorAll('.course-card');
const modalOverlay = document.getElementById('modalOverlay');
const courseModal = document.getElementById('courseModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openAdmissionForm = document.getElementById('openAdmissionForm');
const admissionForm = document.getElementById('admissionForm');
const studentForm = document.getElementById('studentForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
};

// Initialize counter animation
animateCounters();

// Course Details Modal
const courseDetails = {
    eamcet: {
        title: 'EAMCET Short-Term Coaching',
        content: `
            <p>Our intensive EAMCET coaching program is designed for aspiring engineers and medical professionals. We cover all essential subjects with a focus on problem-solving techniques and time management.</p>
            <h4>Subjects Covered:</h4>
            <ul>
                <li>Physics - Complete syllabus with numerical problem solving</li>
                <li>Chemistry - Organic, Inorganic, and Physical Chemistry</li>
                <li>Mathematics - Advanced topics with shortcuts and tricks</li>
                <li>Biology - For medical aspirants (optional)</li>
            </ul>
            <h4>Features:</h4>
            <ul>
                <li>Experienced faculty with proven track records</li>
                <li>Regular mock tests and performance analysis</li>
                <li>Personalized doubt clearing sessions</li>
                <li>Study materials and practice questions</li>
                <li>Time management and exam strategies</li>
            </ul>
        `
    },
    navodaya: {
        title: 'Navodaya Coaching (4th & 5th Class)',
        content: `
            <p>This foundation course is meticulously crafted to help students crack the JNVST entrance exam. We focus on building a strong base in core subjects ensuring comprehensive preparation.</p>
            <h4>Subjects Covered:</h4>
            <ul>
                <li>Mental Ability - Logical reasoning and analytical skills</li>
                <li>Arithmetic - Basic mathematics with problem-solving techniques</li>
                <li>Language - English and regional language proficiency</li>
            </ul>
            <h4>Class-wise Preparation:</h4>
            <ul>
                <li><strong>4th Class:</strong> Foundation building and concept clarity</li>
                <li><strong>5th Class:</strong> Intensive exam-focused preparation</li>
            </ul>
            <h4>Special Features:</h4>
            <ul>
                <li>Bilingual teaching approach</li>
                <li>Regular practice tests</li>
                <li>Individual attention to each student</li>
                <li>Parent-teacher interaction sessions</li>
            </ul>
        `
    },
    sainik: {
        title: 'Sainik School Coaching (8th Class)',
        content: `
            <p>Our specialized program for Sainik School entrance exams covers all aspects including written exam, physical training, and interview preparation.</p>
            <h4>Subjects Covered:</h4>
            <ul>
                <li>Mathematics - Advanced problem solving</li>
                <li>General Knowledge - Current affairs and static GK</li>
                <li>English - Grammar, comprehension, and vocabulary</li>
                <li>Intelligence - Logical and analytical reasoning</li>
            </ul>
            <h4>Additional Training:</h4>
            <ul>
                <li>Physical fitness training and guidance</li>
                <li>Interview preparation and personality development</li>
                <li>Group discussion and communication skills</li>
                <li>Leadership qualities development</li>
            </ul>
            <h4>Success Factors:</h4>
            <ul>
                <li>Disciplined learning environment</li>
                <li>Character building activities</li>
                <li>Regular assessments and feedback</li>
                <li>Comprehensive study materials</li>
            </ul>
        `
    }
};

// Course card click handlers
courseCards.forEach(card => {
    card.addEventListener('click', () => {
        const courseType = card.dataset.course;
        const course = courseDetails[courseType];
        
        modalTitle.textContent = course.title;
        modalBody.innerHTML = course.content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Modal close handlers
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Batch Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.batch-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play slider
setInterval(nextSlide, 5000);

// Admission Form
openAdmissionForm.addEventListener('click', () => {
    admissionForm.classList.add('active');
    admissionForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Form Submission
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const studentName = formData.get('studentName');
    const parentName = formData.get('parentName');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const course = formData.get('course');
    
    // Create mailto link
    const adminEmail = 'srisubramanya1219@gmail.com';
    const subject = 'New Admission Application from Website';
    const body = `Student Name: ${studentName}
Parent Name: ${parentName}
Phone Number: ${phone}
Email Address: ${email}
Interested Course: ${course}

This application was submitted via the website form.`;
    
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Application submitted successfully! Your email client has been opened.', 'success');
    
    // Reset form
    this.reset();
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (hero && heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing Effect for Hero Title (Alternative Animation)
function createTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                line.textContent = text.slice(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 1000 + 1000);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Sri Subramanya Educational Institutions website loaded successfully!');
});

// Lazy Loading for Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance Optimization: Debounced Scroll Handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
