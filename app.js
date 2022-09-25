import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import nunjucks from 'nunjucks';
import nocache from 'nocache';
import mainRoute from './project/routes/main.js';
import aboutRoute from './project/routes/about.js';
import catalogRoute from './project/routes/works.js';
import cardRoute from './project/routes/card.js';

const app = express(),
  __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename),
  PORT = process.env.PORT || 3000;

//Указываем для нунчак расширение файлов, которое будем использовать
app.set('view engine', 'html');

//Указываем, где лежат файлы
nunjucks.configure(['project/templates'], {
  autoescape: false,
  express: app,
});

// Отключаем кэширование
app.use(nocache());
app.set('etag', false);

//static and routes
app.use(express.static(path.join(__dirname, 'project/static')));
app.use(mainRoute);
app.use(aboutRoute);
app.use(catalogRoute);
app.use(cardRoute);

//server
app.listen(PORT, () => {
  console.log('Started on port:', PORT);
});
