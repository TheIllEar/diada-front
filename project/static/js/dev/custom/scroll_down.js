(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                        Scroll Down
   *
   *  ############################################################
   */
  app.modules.scroll_down = {
    _selectors: {
      body: 'body',
      btn: '[data-app-arrow-down]',
    },

    init() {
      this._btnClickInint();
    },

    /**
     * Инициализация обработчика
     */
    _btnClickInint() {
      let btn = document.querySelector(this._selectors.btn);
      if (btn) {
        btn.addEventListener('click', this._btnClickHandler);
      }
    },

    /**
     * Обработка клика
     * @param {Event} e
     */
    _btnClickHandler(e) {
      let body = document.querySelector('body'),
        bodyHeight = body.clientHeight;

      scrollTo(0, bodyHeight);
    },
  };
})();
