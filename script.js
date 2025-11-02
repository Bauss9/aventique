// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Search Form Handler
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-form');

if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const carType = document.getElementById('car-type').value;
        const brand = document.getElementById('brand').value;
        const model = document.getElementById('model').value;
        const price = document.getElementById('price').value;

        console.log('Search parameters:', { carType, brand, model, price });

        // Add visual feedback
        searchBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            searchBtn.style.transform = 'scale(1)';
        }, 150);

        // In a real application, this would trigger a search
        alert(`Searching for ${carType} - ${brand} ${model} in ${price} range`);
    });
}

// Pagination for Car Models
let currentPage = 1;
const totalPages = 3; // Simulated total pages

const prevBtn = document.querySelector('.pagination-btn.prev');
const nextBtn = document.querySelector('.pagination-btn.next');
const pageIndicator = document.querySelector('.page-indicator');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Initialize pagination only if buttons exist
    updatePagination();
}

function updatePagination() {
    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage}/${totalPages}`;
    }

    // Update button states only if buttons exist
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    }

    // Animate model cards
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.6s ease-out';
        }, index * 50);
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Card Hover Effects with 3D Tilt
const cards = document.querySelectorAll('.trending-card, .model-card, .review-card, .make-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Intersection Observer for Scroll Animations
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
const sections = document.querySelectorAll('.trending, .car-models, .best-selling, .reviews');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Dynamic Vehicle Count Animation
function animateCount(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + ' vehicles';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + ' vehicles';
        }
    }, 16);
}

// Trigger count animation when trending section is visible
const trendingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counts = entry.target.querySelectorAll('.vehicle-count');
            counts.forEach(count => {
                const text = count.textContent;
                const number = parseInt(text.replace(/,/g, '').replace(' vehicles', ''));
                if (number) {
                    animateCount(count, number);
                }
            });
            trendingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const trendingSection = document.querySelector('.trending');
if (trendingSection) {
    trendingObserver.observe(trendingSection);
}

// Form Select Enhancement
const selects = document.querySelectorAll('.form-select');
selects.forEach(select => {
    select.addEventListener('change', function() {
        this.style.color = 'var(--text-dark)';
    });

    select.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 10px 50px rgba(108, 92, 231, 0.2)';
    });

    select.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
    });
});

// Featured Badge Animation
const featuredBadge = document.querySelector('.featured-badge');
if (featuredBadge) {
    setInterval(() => {
        featuredBadge.style.transform = 'scale(1.05)';
        setTimeout(() => {
            featuredBadge.style.transform = 'scale(1)';
        }, 300);
    }, 3000);

    featuredBadge.style.transition = 'transform 0.3s ease';
    featuredBadge.style.cursor = 'pointer';

    featuredBadge.addEventListener('click', () => {
        alert('Featured vehicles video coming soon!');
    });
}

// Star Rating Hover Effect
const ratings = document.querySelectorAll('.rating');
ratings.forEach(rating => {
    rating.addEventListener('mouseenter', function() {
        const star = this.querySelector('.star');
        star.style.transform = 'scale(1.2) rotate(72deg)';
        star.style.transition = 'transform 0.3s ease';
    });

    rating.addEventListener('mouseleave', function() {
        const star = this.querySelector('.star');
        star.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add loading state to cards
function addLoadingState() {
    const allCards = document.querySelectorAll('.trending-card, .model-card, .review-card');
    allCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    addLoadingState();

    // Add active class to current nav item based on scroll position
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Prevent form submission on Enter key (guarded)
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Add keyboard navigation for cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 1) {
        if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        if (nextBtn) nextBtn.click();
    }
});

// Performance optimization: Lazy load images
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

// Booking Dialog - Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const bookingDialog = document.getElementById('booking-dialog');
    const bookingBtn = document.getElementById('booking-btn');
    const footerBookingBtn = document.getElementById('footer-booking-btn');
    const dialogClose = document.querySelector('.dialog-close');
    const bookingForm = document.getElementById('booking-form');

    // Open dialog
    function openBookingDialog(e) {
        e.preventDefault();
        console.log('Opening booking dialog');
        if (bookingDialog) {
            bookingDialog.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close dialog
    function closeBookingDialog() {
        console.log('Closing booking dialog');
        if (bookingDialog) {
            bookingDialog.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Attach event listeners
    if (bookingBtn) {
        bookingBtn.addEventListener('click', openBookingDialog);
        console.log('Booking button listener attached');
    }

    if (footerBookingBtn) {
        footerBookingBtn.addEventListener('click', openBookingDialog);
        console.log('Footer booking button listener attached');
    }

    if (dialogClose) {
        dialogClose.addEventListener('click', closeBookingDialog);
    }

    // Close on overlay click
    if (bookingDialog) {
        bookingDialog.addEventListener('click', (e) => {
            if (e.target === bookingDialog) {
                closeBookingDialog();
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingDialog && bookingDialog.classList.contains('active')) {
            closeBookingDialog();
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('booking-name').value,
                email: document.getElementById('booking-email').value,
                age: document.getElementById('booking-age').value,
                from: document.getElementById('booking-from').value,
                to: document.getElementById('booking-to').value,
                message: document.getElementById('booking-message').value
            };

            console.log('Booking request:', formData);

            alert('Vielen Dank für Ihre Buchungsanfrage! Wir werden uns in Kürze bei Ihnen melden.');
            closeBookingDialog();
            bookingForm.reset();
        });
    }

    // Update all CTA buttons to open booking dialog
    document.querySelectorAll('.cta-button, .pricing-btn').forEach(btn => {
        btn.addEventListener('click', openBookingDialog);
        console.log('CTA button listener attached');
    });
});

console.log('Car Marketplace Website Loaded Successfully!');