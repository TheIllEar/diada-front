/**
 * Главная
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg, _getProjects } from '../custom/helper.js';

const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=Img',
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=Img';

router.get('/', async function (req, res, next) {
  try {
    const responsePages = await fetch(urlPages),
      responseProject = await fetch(urlProjects);

    let projects = [],
      _projects = await responseProject.json(),
      page = {},
      _pages = await responsePages.json();
    _getProjects(_projects).forEach((_project, i) => {
      // Выводим первые 10 для главной
      if (projects.length < 10 && _project.img) {
        projects.push(_project);
      }
    });
    _pages.data.forEach((_page, i) => {
      if (_page.attributes.Name === 'main') {
        page = {
          title: _page.attributes.Title,
          description: _page.attributes.Description,
          keywords: _page.attributes.Keywords,
          caption: _page.attributes.Caption,
          img: '',
          active: 'main',
        };
        if (_page.attributes.Img && _page.attributes.Img.data) {
          let _img = _page.attributes.Img.data,
            { _imgDefult } = _getImg(_img);
          if (_imgDefult) {
            page.img = _imgDefult;
          }
        }
      }
    });
    res.render('pages/main', {
      page,
      items: projects,
    });
  } catch (error) {
    console.error(chalk.red('Ошибка на бэке:'), error);
  }
});

export default router;
