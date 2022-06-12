import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import nunjucks from 'nunjucks';
import mainRoute from './project/routes/main.js';
import aboutRoute from './project/routes/about.js';
import catalogRoute from './project/routes/works.js';
import cardRoute from './project/routes/card.js';
import reviewsRoute from './project/routes/reviews.js';

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

//static and routes
app.use(express.static(path.join(__dirname, 'project/static')));
app.use(mainRoute);
app.use(aboutRoute);
app.use(catalogRoute);
app.use(cardRoute);
app.use(reviewsRoute);

//server
app.listen(PORT, () => {
  console.log('started on', PORT);
});
