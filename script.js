document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
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

const bars = document.querySelectorAll('.bar-fill');

const animatePerformance = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            bars.forEach(bar => {
                bar.style.width = bar.dataset.width || '90%';
                bar.style.opacity = 1;
            });
            observer.unobserve(entry.target);
        }
    });
};

const performanceObserver = new IntersectionObserver(animatePerformance, {
    threshold: 0.5
});

const featureCards = document.querySelectorAll('.feature-v2-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(98, 173, 255, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

const toolCards = document.querySelectorAll('.tool-card');

toolCards.forEach(card => {
    const icon = card.querySelector('.tool-icon');

    card.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-value');

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.dataset.value);
                let current = 0;

                const updateCounter = () => {
                    const increment = value / 50;
                    if (current < value) {
                        current += increment;
                        target.textContent = Math.ceil(current).toString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = value;
                    }
                };

                updateCounter();
                observer.unobserve(target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    stats.forEach(stat => statsObserver.observe(stat));
});

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}
