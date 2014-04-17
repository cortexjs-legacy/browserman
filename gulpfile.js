var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');

process.on("uncaughtException",function(err){
    console.log(err);
});

gulp.task('stylus', function(){
    gulp.src(["./public/css/**/*.styl"])
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function(){
    gulp.src(["./public/views/*.jade"])
        .pipe(jade())
        .pipe(gulp.dest("./public/"));

});


gulp.task('watch', function () {
  gulp.watch(["./public/views/**/*.jade"], ['jade']);
  gulp.watch(["./public/css/**/*.styl"], ['stylus']);
});

gulp.task('default', ['stylus','jade','watch']);
