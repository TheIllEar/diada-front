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
