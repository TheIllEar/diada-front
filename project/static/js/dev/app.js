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
    console.log(document.querySelector(this._selectors.body));
    document.querySelector(this._selectors.body).classList.add(this._classes.load);
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
