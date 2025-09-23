// Navegação entre seções
function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar seção selecionada
    document.getElementById(sectionId).classList.add('active');
    
    // Atualizar menu ativo
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    // Fechar menu mobile se estiver aberto
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('mobile-open');
    }
}

// Toggle do tema
function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector('.toggle-switch');
    
    body.classList.toggle('light-theme');
    toggle.classList.toggle('active');
    
    // Salvar preferência no localStorage
    const isLightTheme = body.classList.contains('light-theme');
    localStorage.setItem('lightTheme', isLightTheme);
}

// Menu mobile
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Carregar tema salvo
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('lightTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('light-theme');
        document.querySelector('.toggle-switch').classList.add('active');
    }
});

// Fechar menu mobile ao clicar fora
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target) &&
        sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }
});

// Animações de scroll suave
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