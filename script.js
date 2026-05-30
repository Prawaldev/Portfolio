document.addEventListener('DOMContentLoaded', function () {

    // Nav scroll state
    const nav = document.getElementById('mainNav');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });


    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // Scroll reveal (blur-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // Hero typing effect
    const h1 = document.querySelector('.hero-content h1');
    if (h1) {
        const highlight = h1.querySelector('.highlight');
        const textNode = h1.firstChild;          // "Hi, I'm a "
        const full = textNode.textContent;

        textNode.textContent = '';
        h1.style.opacity = '1';
        h1.style.filter = 'none';
        h1.style.transform = 'none';

        let i = 0;
        function type() {
            if (i < full.length) {
                textNode.textContent += full[i++];
                setTimeout(type, 55);
            }
        }
        setTimeout(type, 400);
    }


    // Contact form
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form && submitBtn) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const original = submitBtn.textContent;
            submitBtn.textContent = 'sent!';
            submitBtn.disabled = true;
            submitBtn.style.background = 'var(--green)';
            submitBtn.style.borderColor = 'var(--green)';
            submitBtn.style.color = 'var(--base)';

            setTimeout(() => {
                submitBtn.textContent = original;
                submitBtn.disabled = false;
                submitBtn.style.cssText = '';
                form.reset();
            }, 2500);
        });
    }

});