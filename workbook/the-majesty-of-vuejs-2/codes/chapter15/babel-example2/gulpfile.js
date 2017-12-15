const gulp = require('gulp')
// 걸프가 바벨을 직접 실행하기 위한 플러그인
const babel = require('gulp-babel')

// gulp.task('default', ['babel'])
gulp.task('default', ['watch'])

gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('assets/js/'))
})

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['babel'])
})
