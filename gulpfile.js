var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');

gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
  .pipe(compass({
    config_file: './config.rb',
    css: 'public/css',
    sass: 'sass',
	 require: ['susy']
  }))
  .on('error', function(err) {
  	console.log(err);
	})
  .pipe(minifyCSS())
  .pipe(gulp.dest('./public/css'));
});

