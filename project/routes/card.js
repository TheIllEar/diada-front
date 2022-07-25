/**
 * Карточка
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg } from '../custom/helper.js';

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
              _card = await responseCard.json(),
              _img = _card.data.attributes.img.data,
              { _imgDefult } = _getImg(_img),
              { _imgSmall } = _getImg(_img),
              card = {
                id: _card.data.id,
                title: _card.data.attributes.title,
                service: _card.data.attributes.service,
                client: _card.data.attributes.client,
                description: _card.data.attributes.description,
                date: _card.data.attributes.date,
                img: _imgDefult ? _imgDefult : '',
                imgMobile: _imgSmall ? _imgSmall : '',
              },
              page = {
                title: 'DIADA | ' + _card.data.attributes.title,
                description: _card.data.attributes.description,
                img: _imgDefult ? _imgDefult : '',
                active: 'works',
              };
            res.render('pages/card', {
              item: card,
              page: page,
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
