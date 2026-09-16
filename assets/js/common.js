(function () {
    const THEME_KEY = 'theme';

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
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
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;

        const toggle = document.getElementById('theme-toggle');

        if (toggle) {
            const isDark = theme === 'dark';

            toggle.textContent = isDark ? '☀' : '☾';

            const nextTheme = isDark ? 'light' : 'dark';

            toggle.setAttribute(
                'aria-label',
                'Switch to ' + nextTheme + ' mode'
            );

            toggle.setAttribute(
                'title',
                'Switch to ' + nextTheme + ' mode'
            );
        }
    }

    // Apply theme immediately
    applyTheme(getPreferredTheme());


    $(document).ready(function () {

        // Existing abstract functionality
        $('a.abstract').click(function () {
            $(this)
                .parent()
                .parent()
                .find(".abstract.hidden")
                .toggleClass('open');
        });

        // Existing BibTeX functionality
        $('a.bibtex').click(function () {
            $(this)
                .parent()
                .parent()
                .find(".bibtex.hidden")
                .toggleClass('open');
        });


        // ---------------------------------------------------------
        // Add theme toggle to navigation
        // ---------------------------------------------------------

        const nav = document.querySelector('.site-nav .trigger');

        if (nav && !document.getElementById('theme-toggle')) {
            const button = document.createElement('button');

            button.id = 'theme-toggle';
            button.className = 'theme-toggle';
            button.type = 'button';

            nav.appendChild(button);

            // Set correct icon/label
            applyTheme(getPreferredTheme());

            button.addEventListener('click', function () {
                const currentTheme =
                    document.documentElement.getAttribute('data-theme');

                const newTheme =
                    currentTheme === 'dark' ? 'light' : 'dark';

                localStorage.setItem(THEME_KEY, newTheme);

                applyTheme(newTheme);
            });
        }


        // ---------------------------------------------------------
        // Follow OS theme changes if user hasn't manually selected
        // a preference.
        // ---------------------------------------------------------

        if (window.matchMedia) {
            const systemTheme =
                window.matchMedia('(prefers-color-scheme: dark)');

            const handleSystemThemeChange = function (event) {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(event.matches ? 'dark' : 'light');
                }
            };

            if (systemTheme.addEventListener) {
                systemTheme.addEventListener(
                    'change',
                    handleSystemThemeChange
                );
            }
        }
    });
})();
