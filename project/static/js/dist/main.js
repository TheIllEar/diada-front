'use strict';

let app = {
  _selectors: {
    body: 'body',
  },
  _classes: {
    load: 'app-load',
  },
  modules: {},
  /**
   * Инициализация приложения
   */
  init() {
    this.modulesInit();
    this.contentLoaded();
  },

  /**
   * Обработка после загрузки страницы
   */
  contentLoaded() {
    let body = document.querySelector(this._selectors.body);

    body.classList.add(this._classes.load);
    onbeforeunload = () => {
      body.classList.remove(this._classes.load);
    };
  },

  /**
   * Инициализация модулей
   */
  modulesInit() {
    app.modulesCall('init');
  },

  /**
   * Вызов модулей
   */
  modulesCall(func_name) {
    for (let instance in app.modules) {
      if (instance in app.modules) {
        console.log(`Inited: ${instance}`);
        app.modules[instance][func_name]();
      }
    }
  },
};

/**
 * Обработка загрузки страницы
 */
window.ready = (called) => {
  if (document.readyState !== 'loading') {
    called();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', called);
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState !== 'loading') {
        called();
      }
    });
  }
};

/**
 * Проверка загрузки страницы
 */
window.ready(() => {
  app.init();
});

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

(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                        Fixed Footer
   *
   *  ############################################################
   */
  app.modules.footerFix = {
    _selectors: {
      body: 'body',
      header: '[data-app-header]',
      container: '[data-app-container]',
      footer: '[data-app-footer]',
    },
    _classes: {
      snap: 'snap',
    },
    init() {
      this._fixFooterHandler();
    },
    _fixFooterHandler() {
      let body = document.querySelector(this._selectors.body),
        header = body.querySelector(this._selectors.header),
        container = body.querySelector(this._selectors.container),
        footer = body.querySelector(this._selectors.footer);

      if (header && container && footer) {
        let windowHeight = innerHeight,
          headerHeight = header.clientHeight,
          containerHeight = container.clientHeight + parseInt(getComputedStyle(container).marginBottom),
          footerHeight = footer.clientHeight,
          totalHeight = headerHeight + containerHeight + footerHeight;

        if (totalHeight > windowHeight) {
          container.classList.add(this._classes.snap);
          footer.classList.add(this._classes.snap);
        }
      }
    },
  };
})();

(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                        Lazy load
   *
   *  ############################################################
   */
  app.modules.lazyLoad = {
    _selectors: {
      body: 'body',
      img: '[data-app-catalog-img]',
    },
    _classes: {
      loaded: 'loaded',
      loading: 'loading',
    },
    init() {
      this._lazyLoadHandler();
    },
    _lazyLoadHandler() {
      let body = document.querySelector(this._selectors.body),
        images = body.querySelectorAll(this._selectors.img),
        options = {
          root: null,
          marginRoot: '0px',
          treshold: 0.05,
        },
        observer = new IntersectionObserver((_images) => {
          _images.forEach((e) => {
            let _img = e.target,
              imgUrl = _img.dataset.appCatalogImg;

            if (e.isIntersecting) {
              _img.style.backgroundImage = `url(${imgUrl})`;
              let fakeImg = new Image();

              fakeImg.addEventListener('load', (e) => {
                _img.classList.add(this._classes.loaded);
                setTimeout(() => {
                  _img.parentElement.classList.remove(this._classes.loading);
                }, 500);
              });
              fakeImg.src = imgUrl;
            }
          });
        }, options);

      images.forEach((img) => {
        observer.observe(img);
      });
    },
  };
})();

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
