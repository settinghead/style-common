; (function () {
  'use strict';

  var scsslint = require('gulp-scss-lint');
  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var concat = require('gulp-concat');
  var minifyCSS = require('gulp-minify-css');
  var rename = require('gulp-rename');
  var clean = require('gulp-clean');
  var es = require('event-stream');
  var fs = require('fs');
  var path = require('path');


  gulp.task('clean-dist', function () {
    return gulp.src('dist', {read: false})
      .pipe(clean());
  });

  gulp.task('clean-tmp', function () {
    return gulp.src('tmp', {read: false})
      .pipe(clean());
  });

  gulp.task('clean', ['clean-dist', 'clean-css']);

  gulp.task("sass", ['clean-dist', 'concat-scss'], function () {
    return gulp.src("tmp/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("dist/css"));
  });

  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.task("concat-scss", ['clean-tmp'], function () {
    //generate a concatenated CSS per folder
    var folders = getFolders('src/scss');
    var tasks = folders.map(function(folder) {
      return gulp.src(path.join('src/scss', folder, '**/*.scss'))
        .pipe(concat(folder + ".scss"))
        .pipe(gulp.dest("tmp/"));
    });

   return es.concat.apply(null, tasks);
  });

  gulp.task('scss-lint', function() {
    return gulp.src('src/scss/**/*.scss')
      .pipe(scsslint());
  });

  gulp.task("css-min", ["sass"], function () {
    return gulp.src("dist/css/**/*.css")
      .pipe(minifyCSS({keepBreaks:true}))
      .pipe(rename(function (path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/css"));
  });

gulp.task('build', ['css-min']);
gulp.task('test', ['scss-lint']);

  gulp.task('default', ['build']);


})();
