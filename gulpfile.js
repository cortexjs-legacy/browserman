var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var browserify=require('gulp-browserify');

process.on("uncaughtException", function(err) {
	console.log(err);
});

gulp.task('stylus', function() {
	gulp.src(["./public/css/**/*.styl"])
		.pipe(stylus())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
	gulp.src(["./public/views/*.jade"])
		.pipe(jade())
		.pipe(gulp.dest("./public/"));

});

gulp.task('browserify', function() {
	gulp.src(["./public/js/dev/*.js"])
		.pipe(browserify({
			debug: true
		}))
		.pipe(gulp.dest('./public/js/build/'))
});


gulp.task('watch', function() {
	gulp.watch(["./public/views/**/*.jade"], ['jade']);
	gulp.watch(["./public/css/**/*.styl"], ['stylus']);
	gulp.watch(["./public/js/dev/**/*.js"], ['browserify']);
});

gulp.task('default', ['stylus', 'jade', 'browserify', 'watch']);