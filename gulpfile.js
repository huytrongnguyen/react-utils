/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
*/

/*========== REQUIRED LIBS ==========*/
var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),

/*========== DEPENDENCIES ==========*/
    DEPENDENCIES = [
      'babel-polyfill',
      'react',
      'react-dom'
    ],

/*========== PATH ==========*/
    PATH = {
      JS: 'dist',
      LIBS: 'libs',
      SCRIPT: 'src'
    },

/*========== TASK ==========*/
    TASK = {
      FRAMEWORK: 'framework',
      SCRIPT: 'script'
    };

gulp.task(TASK.FRAMEWORK, function () {
  process.env.NODE_ENV = 'production';
  var bundler = browserify({ debug: false });
  DEPENDENCIES.forEach(function (lib) { bundler.require(lib); });
  return bundler.bundle()
      .pipe(source('framework.min.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(PATH.LIBS));
});

var buildScript = function (name, entry) {
  if (!entry) {
    entry = PATH.SCRIPT + '/index.js';
  }
  var bundler = browserify({
    entries: entry,
    transform: [babelify],
    extensions: ['.jsx', '.js'],
    debug: true,
    cache: {},
    packageCache: {}
  });
  DEPENDENCIES.forEach(function (lib) { bundler.external(lib); });
  return bundler.bundle()
      .on('error', function (err) { console.log(err.message); this.emit('end'); })
      .pipe(source(name + '.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(PATH.JS));
};

gulp.task(TASK.SCRIPT, function () {
  return buildScript('rc-lazy');
});

gulp.task('default', function () {
  // place code for your default task here
  gulp.start(TASK.SCRIPT)
});
