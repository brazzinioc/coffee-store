'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imageMin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

//CSS Utilities
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//JS Utilities
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//Path files
const paths = {
	scss: './src/scss/**/*.scss',
	javascript: './src/js/*.js',
	images: './src/img/**/*',
};




//Task 1 | CSS
function buildStyles() {
	return gulp
		.src(paths.scss) //find src file
		.pipe( sourcemaps.init() ) //map css code
		.pipe( sass() )
		.pipe( postcss( [ autoprefixer(), cssnano() ] ) ) //transform css with autoprefixer
		.pipe( sourcemaps.write('.') )
		.pipe(gulp.dest('./assets/css')); //output
}

//Task 2 | JS
function buildJavaScript() {
	return gulp
		.src(paths.javascript)
		.pipe( sourcemaps.init() )
		.pipe( terser() )
		.pipe( sourcemaps.write('.') )
		.pipe( rename({ suffix: '.min'}) )
		.pipe(gulp.dest('./assets/js'));
}

//Task 3 | Minify Images
function minifyImages() {
	return gulp
		.src(paths.images) //find all images extension
		.pipe( imageMin() )
		.pipe(gulp.dest('./assets/img'))
		.pipe(notify({ message: "Image minified" }));
}


//Task 4 | Convert images to Webp
function convertImagesToWebp() {
	return gulp
		.src(paths.images) //find all images extension
		.pipe( webp() )
		.pipe(gulp.dest('./assets/img'))
		.pipe(notify({ message: "Image coverted to webp" }));
}


//Task 5 | Development
function dev() {
	gulp.watch(paths.scss, buildStyles); //Watch all SCSS changes files
	gulp.watch(paths.javascript, buildJavaScript); //Watch all JS changes files
	gulp.watch(paths.images, minifyImages); 
}

exports.dev = dev;
exports.default = gulp.series(buildStyles, buildJavaScript, minifyImages, convertImagesToWebp);
