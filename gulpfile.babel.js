import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('uglify', () =>
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
  gulp.watch('src/**/*.js', ['uglify'])
);

gulp.task('default', ['uglify', 'watch']);
