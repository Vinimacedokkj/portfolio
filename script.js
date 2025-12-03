// Navbar scroll effect - Otimizado com throttle
const navbar = document.getElementById('navbar');
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fechar menu mobile após clicar em um link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Scroll animations - Otimizado
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Para de observar após aparecer (melhora performance)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aguarda o DOM estar pronto antes de observar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    });
} else {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Form submission - Netlify Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Verifica se há parâmetro de sucesso na URL (após redirecionamento da Netlify)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Mostra mensagem de sucesso
        showFormMessage('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
        // Remove o parâmetro da URL sem recarregar
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    contactForm.addEventListener('submit', (e) => {
        // Permite o submit normal para Netlify Forms
        // Não usa preventDefault() para que o formulário seja enviado normalmente
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        }
    });
}

// Função para mostrar mensagens do formulário
function showFormMessage(type, message) {
    // Remove mensagens anteriores
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insere antes do botão de submit
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        contactForm.insertBefore(messageDiv, submitButton);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Language Selector Dropdown
const languageDropdown = document.querySelector('.language-dropdown');
const languageBtn = document.querySelector('.language-btn');

if (languageDropdown && languageBtn) {
    // Toggle dropdown on button click
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
        const isExpanded = languageDropdown.classList.contains('active');
        languageBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
            languageBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdown when clicking on a language option
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            languageDropdown.classList.remove('active');
            languageBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close dropdown on mobile menu close
    if (navLinks) {
        const originalToggle = navLinks.classList.toggle;
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') && navLinks.classList.contains('active')) {
                languageDropdown.classList.remove('active');
                languageBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}