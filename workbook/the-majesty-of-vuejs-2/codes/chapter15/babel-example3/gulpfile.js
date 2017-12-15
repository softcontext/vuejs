const gulp = require('gulp')
const babel = require('gulp-babel')
// 웹팩을 걸프에 통합하는 기능을 제공한다.
const webpack = require('webpack-stream')

// gulp.task('default', ['babel'])
gulp.task('default', ['watch'])

gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('assets/js/'))
})

//--------------------
gulp.task('webpack', ['babel'], function () {
  // 웹팩은 프로그램의 시작지점에 해당하는 파일 하나를 주면 종속성을 파악하여 연결한다.
  return gulp.src('assets/js/sum.js')
    .pipe(webpack({ output: {
        path: '/assets/webpacked',
        filename: 'app.js'}}
    ))
    .pipe(gulp.dest('assets/webpacked'))
})
//--------------------

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['babel', 'webpack'])
})
