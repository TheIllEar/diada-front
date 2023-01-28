/**
 * Карточка
 */

import { Router } from 'express';
import fetch from 'node-fetch';
import chalk from 'chalk';
import cron from 'node-cron';
import { _getImg, _getImages, _getVideos } from '../custom/helper.js';

const router = Router(),
  urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=Img&populate=CardImages&populate=Video&populate=Thumbs&sort=Sort',
  // urlProjects = 'http://localhost:1337/api/projects?populate=Img&populate=CardImages&populate=Video&populate=Thumbs&sort=Sort',
  getCards = async () => {
    try {
      let responseProject = await fetch(urlProjects),
        _projects = await responseProject.json(),
        projectsNumber = _projects.data.length;
      projectsHandler(_projects);
      cron.schedule('* * * * *', async () => {
        responseProject = await fetch(urlProjects);
        _projects = await responseProject.json();

        if (projectsNumber !== _projects.data.length) {
          projectsNumber = _projects.data.length;
          projectsHandler(_projects);
        }
      });
    } catch (error) {
      console.error(chalk.red('Ошибка на бэке (Получение проектов):'), error);
    }
  },
  projectsHandler = (_projects) => {
    _projects.data.forEach((_project) => {
      const _cardUrl = `https://diada-admin.herokuapp.com/api/projects/${_project.id}?populate=Img&populate=CardImages&populate=Video&populate=Thumbs`;
      // const _cardUrl = `http://localhost:1337/api/projects/${_project.id}?populate=Img&populate=CardImages&populate=Video&populate=Thumbs`;
      router.get(`/work/${_project.attributes.Slug}`, async function (req, res, next) {
        try {
          const responseCard = await fetch(_cardUrl),
            _card = await responseCard.json(),
            _embedVideo = _card.data.attributes.Embed_video,
            _embedAudio = _card.data.attributes.Embed_audio,
            _img = _card.data.attributes.CardImages.data,
            _pageImgData = _card.data.attributes.Img.data,
            _thumb = _card.data.attributes.Thumbs.data,
            _video = _card.data.attributes.Video.data,
            _pageImg = _getImg(_pageImgData),
            { _imgDefult } = _getImg(_img),
            { _imgSmall } = _getImg(_img),
            { _defultImages } = _getImages(_img),
            _thumbs = _getImages(_thumb),
            { _videos } = _getVideos(_video),
            card = {
              id: _card.data.id,
              title: _card.data.attributes.Title,
              service: _card.data.attributes.Service,
              client: _card.data.attributes.Client,
              description: _card.data.attributes.Description,
              date: _card.data.attributes.Date,
              images: _defultImages,
              img: _imgDefult ? _imgDefult : '',
              imgMobile: _imgSmall ? _imgSmall : '',
              videos: _videos,
              thumbs: _thumbs?._defultImages,
              embedVideo: _embedVideo ? _embedVideo.split('|') : [],
              embedAudio: _embedAudio,
            },
            page = {
              title: 'DIADA | ' + _card.data.attributes.Title,
              description: _card.data.attributes.Description,
              img: _pageImg?._imgDefult ? _pageImg._imgDefult : '',
              videos: _videos,
              active: 'main',
              canonical: `diada.studio/work/${_project.attributes.Slug}`,
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
  };
getCards();

export default router;
