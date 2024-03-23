/**
 * Каталог (Пока скрыли)
 */

// import { Router } from 'express';
// import fetch from 'node-fetch'; 
// import chalk from 'chalk';
// import { _getImg, _getProjects } from '../custom/helper.js';

// const router = Router(),
//   urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=Img',
//   urlProjects = 'https://diada-admin.herokuapp.com/api/projects?populate=Img&sort=Sort';

// router.get('/works', async function (req, res, next) {
//   try {
//     const responseProjects = await fetch(urlProjects),
//       responsePages = await fetch(urlPages);

//     let _projects = await responseProjects.json(),
//       projects = [],
//       _pages = await responsePages.json(),
//       page = {};

//     _getProjects(_projects).forEach((_project) => {
//       if (_project.img) {
//         projects.push(_project);
//       }
//     });
//     _pages.data.forEach((_page, i) => {
//       if (_page.attributes.Name === 'works') {
//         page = {
//           title: _page.attributes.Title,
//           description: _page.attributes.Description,
//           keywords: _page.attributes.Keywords,
//           caption: _page.attributes.Caption,
//           img: '',
//           active: 'works',
//           canonical: 'diada.studio/works',
//         };
//         if (_page.attributes.Img && _page.attributes.Img.data) {
//           let _img = _page.attributes.Img.data,
//             { _imgDefult } = _getImg(_img);
//           if (_imgDefult) {
//             page.img = _imgDefult;
//           }
//         }
//       }
//     });
//     res.render('pages/works', {
//       items: projects,
//       page: page,
//     });
//   } catch (error) {
//     console.error(chalk.red('Ошибка на бэке:'), error);
//   }
// });

// export default router;
