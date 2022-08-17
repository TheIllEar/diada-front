(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                       Модуль слайдеров
   *
   *  ############################################################
   */

  // data-app-slider="name" - на контейнер над слайдером
  // data-app-slider-thumbs="name" - на контейнер превьюх

  app.modules.slider = {
    _selectors: {
      body: 'body',
      sliders: '[data-app-slider]',
      navigation_left: '[data-app-arrow-prev]',
      navigation_right: '[data-app-arrow-next]',
    },
    _classes: {
      has_thumbs: 'has-thumbs',
    },
    _data: {
      sliderName: 'appSlider',
    },

    _vars: {
      sliders: {},
    },

    /**
     * Функция инициализации
     */
    init() {
      this.initSliders();
    },

    /**
     * инициализация слайдеров в карточке
     */
    initSliders() {
      const body = document.querySelector(this._selectors.body),
        containers = body.querySelectorAll(this._selectors.sliders);

      if (containers.length) {
        containers.forEach((productContainer) => {
          const sliderName = productContainer.dataset[this._data.sliderName],
            navigationLeft = productContainer.querySelector(this._selectors.navigation_left),
            navigationRight = productContainer.querySelector(this._selectors.navigation_right),
            _setting = {
              slidesPerView: 1,
              spaceBetween: 10,
              grabCursor: true,
              loop: true,
              autoplay: {
                delay: 4500,
              },
              navigation: {
                prevEl: navigationLeft,
                nextEl: navigationRight,
              },
              on: {
                init() {
                  this.el.addEventListener('mouseenter', (e) => {
                    this.autoplay.stop();
                  });
                  this.el.addEventListener('mouseleave', () => {
                    this.autoplay.start();
                  });
                },
              },
            };

          if (productContainer.classList.contains(this._classes.has_thumbs)) {
            let thumbs = body.querySelector(`[data-app-slider-thumbs='${sliderName}']`),
              thumbsSetting = {
                slidesPerView: 2,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                grabCursor: true,
                breakpoints: {
                  [370]: {
                    slidesPerView: 3,
                  },
                  [720]: {
                    slidesPerView: 4,
                  },
                },
              },
              swiperThumbs = new Swiper(thumbs, thumbsSetting);
            if (swiperThumbs) {
              _setting.thumbs = {
                swiper: swiperThumbs,
              };
            }
          }
          let swiperMain = new Swiper(productContainer, _setting);
          this._vars.sliders[sliderName] = swiperMain;
        });
      }
    },
  };
})();
