/**
 * Карточка
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=img',
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=img',
  getCards = async () => {
    try {
      const responseProject = await fetch(urlProjects),
        _projects = await responseProject.json();
      _projects.data.forEach((_project) => {
        const _cardUrl = `https://diada-admin.herokuapp.com/api/projects/${_project.id}?populate=img`;
        router.get(`/works/${_project.id}`, async function (req, res, next) {
          try {
            const responseCard = await fetch(_cardUrl),
              _card = await responseCard.json();
            let card = {
              id: _card.data.id,
              title: _card.data.attributes.title,
              service: _card.data.attributes.service,
              img: _card.data.attributes.img.data ? _card.data.attributes.img.data[0].attributes.formats.medium.url : '',
              imgMobile: _card.data.attributes.img.data ? _card.data.attributes.img.data[0].attributes.formats.small.url : '',
            };

            // _projects.data.forEach((_project, i) => {
            // });
            // _pages.data.forEach((_page, i) => {
            //   if (_page.attributes.name === 'main') {
            //     page = {
            //       title: _page.attributes.title,
            //       description: _page.attributes.description,
            //       keywords: _page.attributes.keywords,
            //       img: _page.attributes.img.data ? _page.attributes.img.data[0].attributes.formats.medium.url : '',
            //     };
            //   }
            // });
            res.render('pages/card', {
              item: card,
            });
          } catch (error) {
            console.error(chalk.red('Ошибка на бэке:'), error);
          }
        });
      });
    } catch (error) {
      console.error(chalk.red('Ошибка на бэке (Получение проектов):'), error);
    }
  };
getCards();

export default router;
