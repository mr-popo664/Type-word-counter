/**
 * Mohit Tools — Shared Layout Injector & Global Chrome
 * Injects:
 *   1. Top Navigation Bar (#site-header) with single Light/Dark theme toggle & mobile drawer
 *   2. Categorized Footer (#site-footer) with legal links & Buy Me a Coffee button
 *   3. Non-intrusive Cookie Consent Banner (saved to localStorage)
 *   4. Automatic "Related Tools" grid (#related-tools-grid)
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'mt_theme';
  const CONSENT_STORAGE_KEY = 'mt_cookie_consent';
  const BUY_ME_A_COFFEE_URL = 'https://www.buymeacoffee.com/crushedcorsair';

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (_) {
      // Ignore storage restrictions
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {
      // Ignore storage restrictions
    }
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;
    const sunIcon = toggleBtn.querySelector('[data-theme-icon="sun"]');
    const moonIcon = toggleBtn.querySelector('[data-theme-icon="moon"]');
    const labelSpan = toggleBtn.querySelector('[data-theme-label]');

    if (theme === 'dark') {
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      toggleBtn.setAttribute('title', 'Switch to light mode');
      if (labelSpan) labelSpan.textContent = 'Light';
    } else {
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      toggleBtn.setAttribute('title', 'Switch to dark mode');
      if (labelSpan) labelSpan.textContent = 'Dark';
    }
  }

  function getActiveNavKey() {
    const path = window.location.pathname || '/';
    if (path === '/' || path === '/index.html') return 'home';
    if (path.indexOf('/tools/') === 0) return 'tools';
    if (path.indexOf('/about') !== -1) return 'about';
    if (path.indexOf('/contact') !== -1) return 'contact';
    return '';
  }

  function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const activeKey = getActiveNavKey();
    const navItems = [
      { key: 'home', label: 'Home', href: '/' },
      { key: 'tools', label: 'All Tools', href: '/#tools-directory' },
      { key: 'about', label: 'About', href: '/about.html' },
      { key: 'contact', label: 'Contact', href: '/contact.html' },
    ];

    const desktopLinksHtml = navItems
      .map(function (item) {
        const isCurrent = item.key === activeKey;
        const currentAttr = isCurrent ? ' aria-current="page"' : '';
        const textClasses = isCurrent
          ? 'text-slate-900 dark:text-zinc-100 font-semibold'
          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100';
        return (
          '<a href="' +
          item.href +
          '"' +
          currentAttr +
          ' class="mt-nav-link text-sm font-medium transition-colors whitespace-nowrap shrink-0 ' +
          textClasses +
          '">' +
          item.label +
          '</a>'
        );
      })
      .join('');

    const mobileLinksHtml = navItems
      .map(function (item) {
        const isCurrent = item.key === activeKey;
        const activeClasses = isCurrent
          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
          : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/70';
        return (
          '<a href="' +
          item.href +
          '" class="block px-3 py-2.5 rounded-lg text-sm transition-colors ' +
          activeClasses +
          '">' +
          item.label +
          '</a>'
        );
      })
      .join('');

    headerEl.className =
      'sticky top-0 z-40 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors';

    headerEl.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">' +
      '  <div class="flex items-center justify-between gap-8 h-16">' +
      '    <a href="/" class="flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-base tracking-tight whitespace-nowrap shrink-0">' +
      '      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" class="w-7 h-7 shrink-0 text-indigo-600 dark:text-indigo-500" aria-hidden="true">' +
      '        <rect x="2" y="2" width="24" height="24" rx="6" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.75"/>' +
      '        <path d="M8 19V9l6 6 6-6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '      </svg>' +
      '      <span>Mohit Tools</span>' +
      '    </a>' +
      '    <nav aria-label="Main navigation" class="hidden md:flex items-center gap-7">' +
      desktopLinksHtml +
      '    </nav>' +
      '    <div class="flex items-center gap-2 shrink-0">' +
      '      <button id="theme-toggle-btn" type="button" aria-label="Switch to dark mode" class="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-100 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer">' +
      '        <svg data-theme-icon="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 hidden" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>' +
      '        <svg data-theme-icon="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' +
      '        <span data-theme-label>Dark</span>' +
      '      </button>' +
      '      <button id="mobile-menu-btn" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer" class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors cursor-pointer">' +
      '        <svg data-menu-open xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>' +
      '        <svg data-menu-close xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 hidden" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '      </button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div id="mobile-nav-drawer" class="hidden md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1">' +
      mobileLinksHtml +
      '</div>';

    // Wire Theme Toggle
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }

    // Wire Mobile Hamburger Drawer
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    if (menuBtn && drawer) {
      const openIcon = menuBtn.querySelector('[data-menu-open]');
      const closeIcon = menuBtn.querySelector('[data-menu-close]');

      function setDrawerOpen(open) {
        if (open) {
          drawer.classList.remove('hidden');
          menuBtn.setAttribute('aria-expanded', 'true');
          menuBtn.setAttribute('aria-label', 'Close navigation menu');
          if (openIcon) openIcon.classList.add('hidden');
          if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
          drawer.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open navigation menu');
          if (openIcon) openIcon.classList.remove('hidden');
          if (closeIcon) closeIcon.classList.add('hidden');
        }
      }

      menuBtn.addEventListener('click', function () {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        setDrawerOpen(!expanded);
      });

      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setDrawerOpen(false);
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
          setDrawerOpen(false);
          menuBtn.focus();
        }
      });
    }

    updateThemeToggleIcons(getSavedTheme());
  }

  function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const tools = window.TOOLS_REGISTRY || [];
    const col1Tools = tools.slice(0, 4);
    const col2Tools = tools.slice(4);

    function buildToolLinks(list) {
      return list
        .map(function (tool) {
          return (
            '<li><a href="' +
            tool.url +
            '" class="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">' +
            tool.shortTitle +
            '</a></li>'
          );
        })
        .join('');
    }

    const year = new Date().getFullYear();

    footerEl.className =
      'mt-16 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors';

    footerEl.innerHTML =
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">' +
      '  <div class="grid grid-cols-1 md:grid-cols-12 gap-10">' +
      '    <div class="md:col-span-5 space-y-4">' +
      '      <a href="/" class="inline-flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-bold text-base tracking-tight">' +
      '        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" class="w-6 h-6 text-indigo-600 dark:text-indigo-500" aria-hidden="true">' +
      '          <rect x="2" y="2" width="24" height="24" rx="6" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.75"/>' +
      '          <path d="M8 19V9l6 6 6-6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '        </svg>' +
      '        <span>Mohit Tools</span>' +
      '      </a>' +
      '      <p class="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 max-w-sm">' +
      '        Fast, privacy-first browser utilities built for engineers, writers, creators, electronics builders, and gamers. Every calculation runs locally on your device with zero server uploads.' +
      '      </p>' +
      '      <div class="pt-1">' +
      '        <a href="' +
      BUY_ME_A_COFFEE_URL +
      '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 hover:border-indigo-500 dark:hover:border-indigo-500 text-sm font-medium transition-colors whitespace-nowrap">' +
      '          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-amber-500" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>' +
      '          <span>Buy Me a Coffee</span>' +
      '        </a>' +
      '      </div>' +
      '    </div>' +
      '    <div class="md:col-span-3 space-y-3">' +
      '      <h3 class="text-sm font-semibold text-slate-900 dark:text-zinc-100">Utilities</h3>' +
      '      <ul class="space-y-2.5">' +
      buildToolLinks(col1Tools) +
      '      </ul>' +
      '    </div>' +
      '    <div class="md:col-span-2 space-y-3">' +
      '      <h3 class="text-sm font-semibold text-slate-900 dark:text-zinc-100">Specialized</h3>' +
      '      <ul class="space-y-2.5">' +
      buildToolLinks(col2Tools) +
      '      </ul>' +
      '    </div>' +
      '    <div class="md:col-span-2 space-y-3">' +
      '      <h3 class="text-sm font-semibold text-slate-900 dark:text-zinc-100">Platform</h3>' +
      '      <ul class="space-y-2.5">' +
      '        <li><a href="/about.html" class="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>' +
      '        <li><a href="/contact.html" class="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>' +
      '        <li><a href="/privacy-policy.html" class="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>' +
      '        <li><a href="/terms.html" class="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '  <div class="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">' +
      '    <p>&copy; ' +
      year +
      ' Mohit Tools (mohit-tools.com). All rights reserved.</p>' +
      '    <p>Client-side processing · Zero server uploads · Static web architecture</p>' +
      '  </div>' +
      '</div>';
  }

  function renderRelatedTools() {
    const container =
      document.getElementById('related-tools') ||
      document.getElementById('related-tools-grid');
    if (!container || !window.MohitToolsData) return;

    if (!container.classList.contains('grid')) {
      container.className = 'grid grid-cols-1 md:grid-cols-3 gap-6';
    }

    const currentToolId =
      container.getAttribute('data-current-tool') ||
      document.body.getAttribute('data-tool-id') ||
      '';

    const related = window.MohitToolsData.getRelatedTools(currentToolId, 3);
    if (!related.length) return;

    container.innerHTML = related
      .map(function (tool) {
        return (
          '<a href="' +
          tool.url +
          '" class="mt-tool-card group flex flex-col justify-between p-6 rounded-xl">' +
          '  <div>' +
          '    <div class="flex items-center justify-between gap-3 mb-4">' +
          '      <div class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400">' +
          tool.iconSvg +
          '      </div>' +
          '      <span class="text-xs font-medium text-slate-500 dark:text-zinc-400">' +
          tool.category +
          '</span>' +
          '    </div>' +
          '    <h3 class="text-base font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">' +
          tool.title +
          '</h3>' +
          '    <p class="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">' +
          tool.description +
          '</p>' +
          '  </div>' +
          '  <div class="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">' +
          '    <span>Open Tool</span>' +
          '    <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">&rarr;</span>' +
          '  </div>' +
          '</a>'
        );
      })
      .join('');
  }

  function renderCookieConsentBanner() {
    try {
      if (localStorage.getItem(CONSENT_STORAGE_KEY)) {
        return;
      }
    } catch (_) {
      return;
    }

    if (document.getElementById('cookie-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.className =
      'fixed bottom-2.5 left-2.5 right-2.5 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-3 sm:p-4 transition-opacity';

    banner.innerHTML =
      '<div class="space-y-2.5">' +
      '  <p class="text-xs leading-snug sm:leading-relaxed text-slate-600 dark:text-zinc-300">' +
      '    Mohit Tools uses local storage for theme preferences and cookies for anonymized analytics and personalized AdSense ads. ' +
      '    <a href="/privacy-policy.html" class="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Privacy Policy</a>.' +
      '  </p>' +
      '  <div class="flex items-center justify-end gap-2">' +
      '    <button id="cookie-essential-btn" type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer">' +
      '      Essential Only' +
      '    </button>' +
      '    <button id="cookie-accept-btn" type="button" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer">' +
      '      Accept' +
      '    </button>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(banner);

    function saveChoice(choice) {
      try {
        localStorage.setItem(
          CONSENT_STORAGE_KEY,
          JSON.stringify({ choice: choice, updatedAt: new Date().toISOString() })
        );
      } catch (_) {
        // Ignore storage restrictions
      }
      banner.remove();
    }

    const acceptBtn = document.getElementById('cookie-accept-btn');
    const essentialBtn = document.getElementById('cookie-essential-btn');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        saveChoice('accepted');
      });
    }
    if (essentialBtn) {
      essentialBtn.addEventListener('click', function () {
        saveChoice('essential');
      });
    }
  }

  function initLayout() {
    applyTheme(getSavedTheme());
    renderHeader();
    renderFooter();
    renderRelatedTools();
    renderCookieConsentBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }

  window.MohitToolsLayout = {
    applyTheme: applyTheme,
    getSavedTheme: getSavedTheme,
    renderRelatedTools: renderRelatedTools,
  };
})();
