(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                        Cookies
   *
   *  ############################################################
   */
  app.modules.cookies = {
    _selectors: {
      body: 'body',
      container: '[data-app-cookies]',
      close: '[data-app-cookies-close]',
    },
    _class: {
      active: 'active',
    },

    init() {
      this._modalCookiesHandler();
    },

    /**
     * Обработка бодалки куки
     */
    _modalCookiesHandler() {
      if (!localStorage.hideCookies) {
        let body = document.querySelector(this._selectors.body),
          container = body.querySelector(this._selectors.container);

        if (container) {
          let closeBtn = container.querySelector(this._selectors.close);
          setTimeout(() => {
            container.classList.add(this._class.active);
          }, 1600);
          closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this._hideModalCookies(container);
          });
        }
      }
    },

    /**
     * Скрываем окно
     * @param {Element} container
     */
    _hideModalCookies(container) {
      container.classList.remove(this._class.active);
      localStorage.hideCookies = true;
    },
  };
})();
