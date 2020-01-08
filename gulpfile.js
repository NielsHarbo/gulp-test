var connect = require("gulp-connect");

var { watchHTML, htmlTask, scssTask, jsTask } = require("./tasks/html");

function watch(){
	watchHTML();

	connect.server({
		livereload: true,
		root: "dist",
		port:3000,
	});
}

function build(done){
    scssTask();
	htmlTask();
	jsTask();
    done();
    
}

exports.default = watch;

exports.build = build;