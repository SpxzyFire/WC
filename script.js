document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
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

const featureCards = document.querySelectorAll('.feature-v2-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'glitch 0.3s linear';
        setTimeout(() => card.style.animation = '', 300);
    });
});

const stats = document.querySelectorAll('.stat-value');
const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent.replace(/[^0-9]/g, '')) || 0;
            let current = 0;
            const increment = value / 60;
            const update = () => {
                if (current < value) {
                    current += increment;
                    target.textContent = Math.ceil(current) + (target.textContent.includes('K') ? 'K+' : 'ms');
                    requestAnimationFrame(update);
                } else {
                    target.textContent = target.dataset.value || target.textContent;
                }
            };
            update();
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
stats.forEach(stat => {
    stat.dataset.value = stat.textContent;
    statsObserver.observe(stat);
});

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) faqItem.classList.add('active');
}

const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.animation = 'pulse 0.5s ease';
        setTimeout(() => button.style.animation = '', 500);
    });
});

const style = document.createElement('style');
style.innerHTML = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(-2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);
