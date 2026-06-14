// header.js — вставляет шапку и подвал на каждую страницу
// Вызывается внизу <body>: <script src="header.js"></script>

(function() {
    // Определяем текущую страницу
    const page = location.pathname.split('/').pop() || 'Main_page_PDEP.html';

    // SVG-иконки (inline, без внешних зависимостей)
    const icons = {
        person: `<svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`,
        cart:   `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.6L5.2 14c-.2.3-.2.6-.2.9C5 16.1 5.9 17 7 17h14v-2H7.4c-.1 0-.2-.1-.2-.2v-.1l1-1.8H19c.8 0 1.4-.4 1.8-1L23.2 6c.3-.4.1-1-.4-1H5.2L4.3 2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
        news:   `<svg viewBox="0 0 24 24"><path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM6 7h8v2H6zm0 4h8v2H6zm0 4h5v2H6z"/></svg>`,
        plus:   `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
        help:   `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 17h-2v-2h2v2zm2.1-7.8l-.9.9C13.5 12.8 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.2-2.8l1.2-1.2c.4-.35.6-.85.6-1.4 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .88-.35 1.68-.9 2.2z"/></svg>`,
        settings:`<svg viewBox="0 0 24 24"><path d="M19.4 13c0-.3.1-.6.1-1s0-.7-.1-1l2.1-1.7c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-1l-.4-2.6c0-.3-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.6c-.6.3-1.2.6-1.7 1l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.5.1.6L4.6 11c0 .3-.1.6-.1 1s0 .7.1 1l-2.1 1.7c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7 1l.4 2.6c.1.2.3.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6L19.4 13zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>`,
        coin:   `🪙`
    };

    const pages = {
        'Main_page_PDEP.html':         { label: 'Главная',   active: 'home' },
        'Account_page_PDEP.html':      { label: 'Профиль',   active: 'person' },
        'Shop_page_PDEP.html':         { label: 'Магазин',   active: 'cart' },
        'News_page_PDEP.html':         { label: 'Новости',   active: 'news' },
        'Subscription_page_PDEP.html': { label: 'Подписка',  active: 'plus' },
        'FAQ.html':                    { label: 'Помощь',    active: 'help' },
        'Settings_page_PDEP.html':     { label: 'Настройки', active: 'settings' },
        'Sign_in_page_PDEP.html':      { label: 'Вход',      active: '' },
        'Registration_page_PDEP.html': { label: 'Регистрация', active: '' },
    };

    function btn(icon, title, href, activeKey) {
        const isCurrent = (pages[page] || {}).active === activeKey;
        return `<a href="${href}"><button class="header-btn${isCurrent ? ' active' : ''}" title="${title}">${icons[icon]}</button></a>`;
    }

    // Не показываем шапку на страницах входа/регистрации
    const noHeader = ['Sign_in_page_PDEP.html', 'Registration_page_PDEP.html'].includes(page);

    if (!noHeader) {
        const headerEl = document.createElement('div');
        headerEl.innerHTML = `
        <nav id="header">
            <a href="Main_page_PDEP.html"><div id="logo-text"><img id="logos" src="images/redDEPlogo.svg"></div></a>
            ${btn('person',   'Профиль',  'Account_page_PDEP.html',      'person')}
            ${btn('cart',     'Магазин',  'Shop_page_PDEP.html',          'cart')}
            ${btn('news',     'Новости',  'News_page_PDEP.html',          'news')}
            ${btn('plus',     'Подписка', 'Subscription_page_PDEP.html',  'plus')}
            <input id="searching" type="text" placeholder="Поиск" maxlength="60">
            <a href="Account_page_PDEP.html"><span id="header-balance">777'777'777</span></a>
            <button id="coin-btn" title="Pi-Коин">🪙</button>
            ${btn('help',     'Помощь',   'FAQ.html',                     'help')}
            ${btn('settings', 'Настройки','Settings_page_PDEP.html',      'settings')}
        </nav>`;
        document.body.insertBefore(headerEl.firstElementChild, document.body.firstChild);
    }

    // Подвал
    const footerEl = document.getElementById('footer');
    if (footerEl) {
        footerEl.innerHTML = `
            <div id="footer_first">
                <h4>О проекте</h4>
                <a href="FAQ.html">О нас</a>
                <a href="FAQ.html">FAQ</a>
                <a href="#">Партнеры</a>
            </div>
            <div id="footer_second">
                <h4>Документы</h4>
                <a href="#">Пользовательское соглашение</a>
                <a href="#">Правила и условия</a>
                <a href="#">Политика возврата</a>
            </div>
            <div id="footer_third">
                <h4>Контакты</h4>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=danielveselov28@gmail.com&su=Обратная%20связь&body=Здравствуйте!">Обратная связь</a>
                <a href="https://t.me/pidepcasino" target="_blank">Telegram-канал</a>
            </div>
            <div id="footer_logo">
                <a href="Main_page_PDEP.html"><div id="logo-text"><img id="logos" src="images/goldDEPlogo.svg"></div></a>
            </div>`;
    }
})();
