var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var browserify=require('gulp-browserify');

process.on("uncaughtException", function(err) {
	console.log(err);
});

gulp.task('stylus', function() {
	gulp.src(["./public/dev/css/**/*.styl"])
		.pipe(stylus())
		.pipe(gulp.dest('./public/build/css'));
});

gulp.task('jade', function() {
	gulp.src(["./public/dev/views/*.jade"])
		.pipe(jade())
		.pipe(gulp.dest("./public/build/"));

});

gulp.task('browserify', function() {
	gulp.src(["./public/dev/js/*.js"])
		.pipe(browserify({
			debug: true
		}))
		.pipe(gulp.dest('./public/build/js'))
});


gulp.task('watch', function() {
	gulp.watch(["./public/dev/views/**/*.jade"], ['jade']);
	gulp.watch(["./public/dev/css/**/*.styl"], ['stylus']);
	gulp.watch(["./public/dev/js/**/*.js"], ['browserify']);
});

gulp.task('default', ['stylus', 'jade', 'browserify', 'watch']);