(function () {
  'use strict';
  /**
   *  ############################################################
   *
   *                       SideMobileMenu
   *
   *  ############################################################
   */
  // window.ready(function ()!!!!!!!!!!!!
  const module = {
      selectors: {
        nav_container: '[data-app-nav-container]',
        nav_btn: '[data-app-nav-btn]',
      },
      classes: {},
    },
    body = document.querySelector('body'),
    shape = body.querySelector('[data-app-shape]'),
    navContainer = body.querySelector('[data-app-nav-container]'),
    navBtn = body.querySelector('[data-app-nav-btn]');
  if (navContainer && navBtn) {
    navBtn.addEventListener('click', () => {
      navContainer.classList.toggle('toggle');
      body.classList.toggle('disabled-scroll');
    });
    body.addEventListener('click', (e) => {
      if (e.target === shape) {
        navContainer.classList.remove('toggle');
        body.classList.remove('disabled-scroll');
      }
    });
  }
})();

(function () {
  /**
   *  ############################################################
   *
   *                        Lazy load
   *
   *  ############################################################
   */
  'use strict';
  let images = document.querySelectorAll('[data-app-catalog-img]'),
    options = {
      roo: null,
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
            _img.classList.add('loaded');
            setTimeout(() => {
              _img.parentElement.classList.remove('loading');
            }, 500);
          });
          fakeImg.src = imgUrl;
        }
      });
    }, options);
  images.forEach((img) => {
    observer.observe(img);
  });
})();

(function () {
  /**
   *  ############################################################
   *
   *                        Fixed Footer
   *
   *  ############################################################
   */
  'use strict';
  let header = document.querySelector('[data-app-header]'),
    container = document.querySelector('[data-app-container]'),
    footer = document.querySelector('[data-app-footer]');
  if (header && container && footer) {
    let windowHeight = innerHeight,
      headerHeight = header.clientHeight,
      containerHeight = container.clientHeight + parseInt(getComputedStyle(container).marginBottom),
      footerHeight = footer.clientHeight,
      totalHeight = headerHeight + containerHeight + footerHeight;
      if (totalHeight > windowHeight) {
        container.classList.add('snap');
        footer.classList.add('snap');
      }
  }
})();
