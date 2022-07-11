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
