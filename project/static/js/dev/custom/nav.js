(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                       SideMobileMenu
   *
   *  ############################################################
   */
  app.modules.sideMobileMenu = {
    _selectors: {
      body: 'body',
      nav_container: '[data-app-nav-container]',
      nav_btn: '[data-app-nav-btn]',
      shape: '[data-app-shape]',
    },
    _classes: {
      disable: 'disabled-scroll',
      toggle: 'toggle',
    },
    init() {
      this._mobileMenuHandler();
    },
    _mobileMenuHandler() {
      const body = document.querySelector(this._selectors.body),
        shape = body.querySelector(this._selectors.shape),
        navContainer = body.querySelector(this._selectors.nav_container),
        navBtn = body.querySelector(this._selectors.nav_btn);

      if (navContainer && navBtn) {
        navBtn.addEventListener('click', () => {
          navContainer.classList.toggle(this._classes.toggle);
          body.classList.toggle(this._classes.disable);
        });
        body.addEventListener('click', (e) => {
          if (e.target === shape) {
            navContainer.classList.remove(this._classes.toggle);
            body.classList.remove(this._classes.disable);
          }
        });
      }
    },
  };
})();
