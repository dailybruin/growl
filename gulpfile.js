var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('html', function() {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
  });

gulp.task('default', ['html', 'sass']);