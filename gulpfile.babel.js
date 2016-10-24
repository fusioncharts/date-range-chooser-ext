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
import { exec } from 'child_process';

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

gulp.task('build-es5', ['docs'], () =>
  gulp.src(PATH.clientEntryPoint)
    .pipe(sourcemaps.init())
      .pipe(webpack(webpackEs5Config))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('build', ['build-es5'], () =>
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

gulp.task('docs', ['test'], () => {
  exec('node ./node_modules/.bin/jsdoc -c jsdoc.json', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
    console.log(`${stderr}`);
  });
});

gulp.task('watch', () =>
  gulp.watch(PATH.allSrcJs, ['build'])
);

gulp.task('default', ['watch', 'build']);
