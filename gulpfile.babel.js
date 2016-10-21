import gulp from 'gulp';
// import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import prettydiff from 'gulp-prettydiff';
import webpackEs5Config from './webpack-es5.config.babel.js';
import webpackEs6Config from './webpack-es6.config.babel.js';

const PATH = {
  allSrcJs: 'src/**/*.js',
  allTests: 'test/**/*.js',
  clientEntryPoint: 'src/index.js',
  gulpFile: 'gulpfile.babel.js',
  webpackEs5File: 'webpack-es5.config.babel.js',
  webpackEs6File: 'webpack-es6.config.babel.js'
};

gulp.task('lint', () =>
  gulp.src([
    PATH.allSrcJs,
    PATH.gulpFile,
    PATH.webpackEs5File,
    PATH.webpackEs6File
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

// gulp.task('build', ['lint'], () =>
//   gulp.src(PATH.allSrcJs)
//     .pipe(babel())
//     .pipe(gulp.dest('lib'))
// );

gulp.task('test', ['lint'], () =>
  gulp.src(PATH.allTests)
    .pipe(mocha())
);

gulp.task('build-es5', () =>
  gulp.src(PATH.clientEntryPoint)
    .pipe(sourcemaps.init())
      .pipe(webpack(webpackEs5Config))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('build-es6', () =>
  gulp.src(PATH.clientEntryPoint)
    .pipe(sourcemaps.init())
      .pipe(webpack(webpackEs6Config))
      .pipe(prettydiff({
        lang: 'javascript',
        mode: 'minify'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
  gulp.watch(PATH.allSrcJs, ['test', 'build-es5', 'build-es6'])
);

gulp.task('default', ['watch', 'test', 'build-es5', 'build-es6']);
