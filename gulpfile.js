const gulp = require('gulp');
const gutil = require('gulp-util');


/* *************
 CSS
 ************* */

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const inlineCSS = require('postcss-inline-css');

const sassMainFile = 'src/css/main.scss';
const sassFiles = 'src/css/**/*.scss';

gulp.task('css', function() {
	gulp.src(sassMainFile)
		.pipe(postcss([autoprefixer()], {syntax: scss}))
		.pipe(sass({ outputStyle: 'expanded' }).on('error', gutil.log))
		.pipe(postcss([inlineCSS({
			loadCSS: '/assets/css/main.css?v='+Math.floor(Date.now()/1000),
			files: ['default.hbs']
		})]))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/css'));
});



/* *************
 JS
 ************* */

const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const babel = require('gulp-babel');
const jsFiles = 'src/js/**/*.js';

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(
			babel({ presets: ['es2015'] })
				.on('error', gutil.log)
		)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'));
});


gulp.task('watch', function() {
	gulp.watch(sassFiles,['css']);
	gulp.watch(jsFiles,['js']);
});

gulp.task('default', ['css', 'js', 'watch']);