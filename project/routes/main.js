/**
 * Главная
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg, _getProjects } from '../custom/helper.js';
import { ADMIN_URL } from '../custom/constants.js';

const router = Router(),
  urlPages = ADMIN_URL + '/api/pages?populate=Img',
  urlProjects = ADMIN_URL + '/api/projects?populate=Img&sort=Sort';

router.get('/', async function (req, res, next) {
  try {
    const responsePages = await fetch(urlPages),
      responseProject = await fetch(urlProjects);

    let projects = [],
      _projects = await responseProject.json(),
      page = {},
      contentType = ['ALL'],
      projectsTypes = [],
      _pages = await responsePages.json();
    _getProjects(_projects).forEach((_project, i) => {
      // Выводим первые 10 для главной
      //   if (projects.length < 10 && _project.img) {
      projects.push(_project);

      // Check Content Types
      if (_project.contentType) {
        _project.contentType.forEach((type) => {
          if (projectsTypes.indexOf(type) === -1) {
            projectsTypes.push(type);
          }
        });
      }
      //   }
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
          canonical: 'diada.studio',
        };
        // Add img
        if (_page.attributes.Img && _page.attributes.Img.data) {
          let _img = _page.attributes.Img.data,
            { _imgDefult } = _getImg(_img);
          if (_imgDefult) {
            page.img = _imgDefult;
          }
        }
        // Add Content Types
        if (_page.attributes.ContentType && projectsTypes.length) {
          _page.attributes.ContentType.split(',').forEach((type) => {
            const currentType = type.trim().toUpperCase();
            if (projectsTypes.indexOf(currentType) !== -1) {
              contentType.push(currentType);
            }
          });
          if (contentType.length > 1) {
            page.contentType = contentType;
            page.request = {
              query: req.query,
              originalUrl: req.originalUrl.slice(1),
            };
            if (page.request.query.content_type) {
              projects.forEach((_project) => {
                if (_project.contentType && _project.contentType.indexOf(page.request.query.content_type.toUpperCase()) !== -1) {
                  _project.visible = true;
                }
              });
            }
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
