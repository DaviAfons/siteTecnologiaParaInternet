/**
 * Black N' Dark — script.js
 * Menu hambúrguer: abre/fecha via JS, sem erros no console
 */

document.addEventListener('DOMContentLoaded', function () {

    // ── Elementos ──────────────────────────────────────────
    const nav        = document.querySelector('nav');
    const navList    = document.querySelector('nav ul');

    if (!nav || !navList) return; // segurança: sai se o nav não existir

    // ── Criar botão hambúrguer dinamicamente ───────────────
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-menu');
    hamburger.innerHTML = '&#9776;'; // ☰

    // Adiciona o botão antes da ul no nav
    nav.insertBefore(hamburger, navList);

    // ID para aria-controls
    navList.setAttribute('id', 'nav-menu');

    // ── Função: toggle do menu ─────────────────────────────
    function toggleMenu() {
        const isOpen = navList.classList.toggle('nav-open');

        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // ✕ ou ☰
        hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    }

    // ── Evento: clique no botão ────────────────────────────
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // ── Fechar ao clicar em um link do menu ────────────────
    navList.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navList.classList.contains('nav-open')) {
                toggleMenu();
            }
        });
    });

    // ── Fechar ao clicar fora do nav ───────────────────────
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && navList.classList.contains('nav-open')) {
            toggleMenu();
        }
    });

    // ── Fechar ao pressionar ESC ───────────────────────────
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navList.classList.contains('nav-open')) {
            toggleMenu();
            hamburger.focus();
        }
    });

    // ── Resetar estado ao redimensionar para desktop ───────
    window.addEventListener('resize', function () {
        if (window.innerWidth > 700 && navList.classList.contains('nav-open')) {
            navList.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.innerHTML = '&#9776;';
        }
    });

});