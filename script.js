// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Active nav link on scroll (index page only)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.toggle('active', href === `#${current}`);
            }
        });
    });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form with Formspree
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            const msg = document.createElement('div');
            msg.className = 'form-message';

            if (res.ok) {
                msg.classList.add('success');
                msg.textContent = "Message sent — I'll get back to you soon.";
                contactForm.reset();
            } else {
                throw new Error();
            }

            contactForm.appendChild(msg);
            setTimeout(() => { msg.remove(); btn.textContent = original; btn.disabled = false; }, 4000);
        } catch {
            const msg = document.createElement('div');
            msg.className = 'form-message error';
            msg.textContent = 'Something went wrong. Please try again.';
            contactForm.appendChild(msg);
            setTimeout(() => { msg.remove(); btn.textContent = original; btn.disabled = false; }, 4000);
        }
    });
}

// Profile image fallback
const profileImgs = document.querySelectorAll('#profileImg, #profileImgAbout');
profileImgs.forEach(img => {
    img.addEventListener('error', function () {
        const wrap = this.closest('.profile-photo-wrap, .profile-image');
        if (wrap) {
            const ph = document.createElement('div');
            ph.className = wrap.classList.contains('profile-photo-wrap')
                ? 'profile-photo-placeholder'
                : 'profile-image';
            ph.innerHTML = '<i class="fas fa-user"></i>';
            wrap.replaceWith(ph);
        }
    });
});

// Viewport height fix for mobile browsers
const setVH = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
setVH();
window.addEventListener('resize', setVH);
