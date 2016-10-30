'use strict';

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var run = require('run-sequence');

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: [
          require("bourbon").includePaths,
        ]
      })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(csscomb())
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png, jpg, gif}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizitaionLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function() {
  return gulp.src('build/img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function() {
  return del('build');
})

gulp.task('copy', function() {
  return gulp.src([
      'fonts/**/*.{woff, woff2}',
      'img/**',
      'js/**',
      '*.html'
    ], {
      base: '.'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  })
});

gulp.task('htmlCopy', function() {
  return gulp.src(['*.html'])
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('serve', ['browserSync'], function() {
  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html', ['htmlCopy']);
});

gulp.task('build', function(fn) {
  run('clean', 'copy', 'style', 'images', 'symbols', fn)
});
