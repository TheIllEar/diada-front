/**
 * Главная
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg } from '../custom/helper.js';

const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=img',
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=img';

router.get('/', async function (req, res, next) {
  try {
    const responsePages = await fetch(urlPages),
      responseProject = await fetch(urlProjects);

    let projects = [],
      _projects = await responseProject.json(),
      page = {},
      _pages = await responsePages.json();

    _projects.data.forEach((_project, i) => {
      // Выводим первые 10 для главной
      if (i <= 10) {
        let _img = _project.attributes.img.data,
          { _imgDefult } = _getImg(_img),
          { _imgSmall } = _getImg(_img);

        projects.push({
          id: _project.id,
          title: _project.attributes.title,
          service: _project.attributes.service,
          img: _imgDefult ? _imgDefult : '',
          imgMobile: _imgSmall ? _imgSmall : '',
        });
      }
    });
    _pages.data.forEach((_page, i) => {
      if (_page.attributes.name === 'main') {
        let _img = _page.attributes.img.data,
          { _imgDefult } = _getImg(_img);
        page = {
          title: _page.attributes.title,
          description: _page.attributes.description,
          keywords: _page.attributes.keywords,
          caption: _page.attributes.caption,
          img: _imgDefult ? _imgDefult : '',
        };
      }
    });
    res.render('pages/main', {
      page: page,
      items: projects,
    });
  } catch (error) {
    console.error(chalk.red('Ошибка на бэке:'), error);
  }
});

export default router;
