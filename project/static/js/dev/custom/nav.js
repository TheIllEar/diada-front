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
      this._listeners();
      this._mobileMenuHandler();
    },

    _listeners() {
      if (window.innerWidth < 720) {
        // document.querySelector(this._selectors.nav_container).addEventListener('touchstart', this._handleTouch, false);
        document.querySelector(this._selectors.nav_container).addEventListener('touchmove', this._handleTouch, false);
        document.querySelector(this._selectors.nav_container).addEventListener('touchend', this._handleTouchEnd, false);
      }
    },

    _handleTouch(e) {
      if (e.type === 'touchmove' && !e.target.closest('.toggle-menu') && !e.target.classList.contains('toggle-menu')) {
        let x = e.changedTouches[0].clientX,
          total = this.clientWidth,
          position = x - total;
        if (position < 0) this.style.left = x - total + 'px';
        else if (position >= 0) this.style.left = 0 + 'px';
      }
    },

    _handleTouchEnd(e) {
      if (!e.target.closest('.toggle-menu') && !e.target.classList.contains('toggle-menu')) {
        let navBtn = e.currentTarget.querySelector('[data-app-nav-btn]'),
          x = e.changedTouches[0].clientX,
          total = this.clientWidth,
          position = x - total;

        this.style.left = '';
        if (position <= -total * 0.5) {
          navBtn.click();
        }
      }
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
