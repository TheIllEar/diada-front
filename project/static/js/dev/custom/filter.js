(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                        Filter
   *
   *  ############################################################
   */
  app.modules.filter = {
    _selectors: {
      body: 'body',
      filter: '[data-app-filter]',
      filter_item: '[data-app-filter-item]',
      card: '[data-app-content-type]',
    },
    _classes: {
      active: 'active',
      hidden: 'hide',
    },
    _vars: {
      search_value: 'ALL',
    },
    init() {
      this._filterHandler();
    },

    _filterHandler() {
      const body = document.querySelector(this._selectors.body),
        filter = body.querySelector(this._selectors.filter);
      if (filter) {
        const filterItems = filter.querySelectorAll(this._selectors.filter_item);

        filterItems.forEach((_item) => {
          _item.addEventListener('click', (e) => {
            const activeItem = filter.querySelector(`${this._selectors.filter_item}.active`),
              target = e.currentTarget;
            if (activeItem !== target) {
              const contentType = target.innerText;
              this._urlHandler(activeItem, target, contentType);
              this._drawCards(contentType);
            }
          });
        });
      }
    },

    /**
     * Collect URL
     * @param {Element} activeItem
     * @param {Target} target
     * @param {String} contentType
     */
    _urlHandler(activeItem, target, contentType) {
      let URL = location.origin;

      if (activeItem) activeItem.classList.remove(`${this._classes.active}`);
      target.classList.add(`${this._classes.active}`);
      if (contentType !== this._vars.search_value) {
        URL += '/?content_type=' + contentType.replace(/ /g, '_').toLowerCase();
      }
      window.history.pushState({ url: URL }, '', URL);
    },

    /**
     * Draw cards by filter
     * @param {String} contentType
     */
    _drawCards(contentType) {
      const body = document.querySelector(this._selectors.body),
        cards = body.querySelectorAll(this._selectors.card);

      if (contentType !== this._vars.search_value) {
        cards.forEach((_card) => {
          if (_card.dataset.appContentType.indexOf(contentType) === -1) {
            _card.classList.add(this._classes.hidden);
            _card.classList.remove(this._classes.active);
          }
        });
        cards.forEach((_card) => {
          if (_card.dataset.appContentType.indexOf(contentType) !== -1) {
            _card.classList.remove(this._classes.hidden);
            if (!_card.classList.contains(this._classes.active)) {
              _card.classList.add(this._classes.active);
            }
          }
        });
      } else {
        cards.forEach((_card) => {
          _card.classList.remove(this._classes.hidden);
          if (!_card.classList.contains(this._classes.active)) {
            _card.classList.add(this._classes.active);
          }
        });
      }
    },
  };
})();
