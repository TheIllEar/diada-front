//@todo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//вынести index из pages просто в templates
//проставить path

import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import rename from 'gulp-rename'; //Плагин для перименования
import minCss from 'gulp-clean-css'; //Подключаем минификатор CSS
import postcss from 'gulp-postcss'; //Подключаем PostCSS для префиксов
import autoprefixer from 'autoprefixer'; //Подключаем префиксы
import concatModules from 'gulp-concat';

const sass = gulpSass(dartSass),
  path = {};

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'app.js',
    ext: 'js html',
    watch: ['app.js', 'project/templates/**/*.html', 'project/routes/**/*.js', 'project/custom/**/*.js', 'project/static/**/*.js'],
  }).on('start', () => {
    if (!started) {
      cb();
    }
    started = true;
  });
});

// gulp.task(
//     "browser-sync",
//     gulp.series("nodemon", (done) => {
//         browserSync.init(null, {
//             proxy: "http://localhost:3000",
//             files: ["project/**/*.*"],
//             port: 5000,
//         });
//         done();
//     })
// );

gulp.task('js:build', function () {
  return gulp
    .src('project/static/js/dev/**/*.js') //Берем источник
    .pipe(concatModules('main.js'))
    .pipe(gulp.dest('project/static/js/dist/'));
});

gulp.task('scss', function () {
  return gulp
    .src('project/static/styles/scss/main.scss') //Берем источник
    .pipe(sass().on('error', sass.logError)) //Преобразуем SCSS, If there is an error parsing the SCSS, it will let us know where the error is so we can easily fix it.
    .pipe(rename({ suffix: '.min' })) // Ставим суффикс 'min'
    .pipe(minCss())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('project/static/styles/css'));
  // .pipe(browserSync.stream({ once: true }));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('watch', (done) => {
  gulp.watch('project/static/js/dev/**/*.js', gulp.series('js:build'));
  gulp.watch('project/static/styles/**/*.scss', gulp.series('scss'));
  done();
});

gulp.task('default', gulp.parallel('nodemon', 'watch'));
