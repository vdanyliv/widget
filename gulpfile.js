var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    inject = require('gulp-inject');

var filesToMove = [
        'widget-factory.js',
    ];

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('injectCss', ['minify-css'], function () {
	gulp.src('templates/widget-content.tpl')
		.pipe(inject(gulp.src(['build/css/style.css']), {
			starttag: '<!-- inject:cssFile -->',
			removeTags: true,
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
    	}
		})
	).pipe(gulp.dest('./build/templates'));
});

gulp.task('move', function(){
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('build'));
});

gulp.task('prod', [ 'minify-css', 'injectCss', 'move']);