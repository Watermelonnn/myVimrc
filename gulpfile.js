var gulp	  = require('gulp'),
	markdown  = require('gulp-markdown'),
	extender  = require('gulp-html-extend'),
	webserver = require('gulp-webserver');

gulp.task('markdown', function(){
	return gulp.src('./md/**/*.md')
		.pipe(markdown())
		.pipe(gulp.dest('./App/'));
});

gulp.task('watch', function(){
	return gulp.watch('./md/**/*.md', ['markdown']);
});
	
gulp.task('webserver', ['markdown'],function(){
	return gulp.src('./App/')
		.pipe(webserver({
			port: 8000,
			livereload: true,
			directoryListing : false,
			open: true
		}));
});

gulp.task('default', ['watch','webserver']);
