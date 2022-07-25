/**
 * Каталог
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg } from '../custom/helper.js';

const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=img',
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=img';

router.get('/works', async function (req, res, next) {
  try {
    const responseProjects = await fetch(urlProjects),
      responsePages = await fetch(urlPages);

    let _projects = await responseProjects.json(),
      projects = [],
      _pages = await responsePages.json(),
      page = {};

    _projects.data.forEach((_project) => {
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
    });
    _pages.data.forEach((_page, i) => {
      if (_page.attributes.name === 'works') {
        page = {
          title: _page.attributes.title,
          description: _page.attributes.description,
          keywords: _page.attributes.keywords,
          caption: _page.attributes.caption,
          img: _page.attributes.img.data ? _page.attributes.img.data.attributes.formats.medium.url : '',
          active: 'works',
        };
      }
    });
    res.render('pages/works', {
      items: projects,
      page: page,
    });
  } catch (error) {
    console.error(chalk.red('Ошибка на бэке:'), error);
  }
});

export default router;
