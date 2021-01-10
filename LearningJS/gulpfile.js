const gulp = require('gulp');
// 걸프 의존성을 여기에 씀
const babel = reauire('gulp-babel');


gulp.task('default', function () {
  // 걸프 작업을 여기에 씀.
  // 노드 소스
  gulp.src("es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
  // 브라우저 소스
  gulp.src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
});