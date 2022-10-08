/**
 * О компании
 */

import { Router } from "express";
import fetch from 'node-fetch';
import chalk from 'chalk';
import { _getImg, _getProjects } from '../custom/helper.js';

const router = Router(),
  urlPages = 'https://diada-admin.herokuapp.com/api/pages?populate=Img';

router.get("/about", async function (req, res, next) {
    try {
        const responsePages = await fetch(urlPages);
        let 
          page = {},
          _pages = await responsePages.json();
        
        _pages.data.forEach((_page, i) => {
          if (_page.attributes.Name === 'about') {
            page = {
              title: _page.attributes.Title,
              description: _page.attributes.Description,
              PageDescription: _page.attributes.PageDescription,
              keywords: _page.attributes.Keywords,
              caption: _page.attributes.Caption,
              img: '',
              active: 'about',
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
        res.render('pages/about', {
          page,
        });
      } catch (error) {
        console.error(chalk.red('Ошибка на бэке:'), error);
      }
});

export default router;
