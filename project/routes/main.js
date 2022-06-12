/**
 * Главная
 */

import { Router } from 'express';
import fetch from 'node-fetch';
const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=img',
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=img';

router.get('/', async function (req, res, next) {
  try {
    const responsePajes = await fetch(urlPages),
      responseProject = await fetch(urlProjects);

    let projects = [],
      _projects = await responseProject.json(),
      page = {},
      _pages = await responsePajes.json();

    _projects.data.forEach((_project, i) => {
      // Выводим первые 10 для главной
      if (i <= 10) {
        projects.push({
          id: _project.id,
          title: _project.attributes.title,
          service: _project.attributes.service,
          img: _project.attributes.img.data ? _project.attributes.img.data[0].attributes.formats.medium.url : '',
          imgMobile: _project.attributes.img.data ? _project.attributes.img.data[0].attributes.formats.small.url : '',
        });
      }
    });
    _pages.data.forEach((_page, i) => {
      if (_page.attributes.name === 'main') {
        page = {
          title: _page.attributes.title,
          description: _page.attributes.description,
          keywords: _page.attributes.keywords,
          img: _page.attributes.img.data ? _page.attributes.img.data[0].attributes.formats.medium.url : '',
        };
      }
    });
    res.render('pages/main', {
      page: page,
      items: projects,
    });
  } catch (error) {
    console.error('Ошибка на бэке', error);
  }
});

export default router;
