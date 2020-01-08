var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var pug = require("gulp-pug");
var sass = require("gulp-sass")
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var terser = require("gulp-terser");
var babel = require("gulp-babel");


function scssTask(){
	return gulp.src("src/scss/*.scss")
	.pipe(sass().on("error", sass.logError) )
	.pipe(concat("all.css"))
	.pipe(cleanCss())
    .pipe(gulp.dest("dist/css"))
}
function jsTask(){
	return gulp.src("src/js/*.js")
	.pipe(babel({presets:["@babel/env"]}))
	.pipe(concat("all.js"))
	.pipe(terser())
	.pipe(gulp.dest("dist/js"))
}

function htmlTask(){
	return gulp.src("src/html/*.pug")
	.pipe(sourcemaps.init())
	.pipe(pug({
		pretty:false,
		doctype:"html",
		locals: {
			pageTitle: "Whatever"
		}
		
	}))
	.pipe(rename(function(path){
		if(path.basename != "index"){
			path.dirname = path.basename;
			path.basename = "index";
			path.extname = ".html";
		}
		else{
			path.extname = ".html";
		}
		
	}))
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());

	
}

function watchHTML(){
	return gulp.watch("src/html/*.pug", { ignoreInitial:false }, htmlTask)
}

module.exports = {
	htmlTask,
    watchHTML,
	scssTask,
	jsTask
}