'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	rigger = require('gulp-rigger'),
	prefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
    spritesmith = require('gulp.spritesmith'),
	browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 	   'build/',
        css: 	   'build/css/',
        js:  	   'build/js/',
        js_libs:   'build/js/libs/',
        images:    'build/images/'
    },
    src: {
        html:    'src/html/index.html',
        css:     'src/css/main.less',
        js: 	 'src/js/**/*.js',
        js_libs: 'src/js/libs/*.js',
        sprite:  'src/images/sprite/*.*'
    },
    watch: {
        html:    'src/html/**/*.html',
        css:     'src/css/*.less',
        js: 	 'src/js/**/*.js',
        js_libs: 'src/js/libs/*.js',
        sprite:  'src/images/sprite/*.*'
    }
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Local host"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
    	.pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js_libs:build', function () {
	gulp.src(path.src.js_libs)
		.pipe(gulp.dest(path.build.js_libs))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src([path.src.js, '!' + path.src.js_libs])
		.pipe(jshint())
    	.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function () {
    var spriteData = gulp.src(path.src.sprite).pipe(spritesmith({
        algorithm: 'binary-tree',
        imgName: 'icons.png',
        cssName: 'icons.less',
        imgPath: '../images/icons.png'
    }));
    
    spriteData.img.pipe(gulp.dest(path.build.images));
    spriteData.css.pipe(gulp.dest('src/css/sprite/'));
});


gulp.task('build', [
	'html:build',
    'sprite:build',
    'css:build',
    'css:build',
    'js_libs:build',
    'js:build'
]);

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });

    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });

    watch([path.watch.js_libs], function(event, cb) {
        gulp.start('js_libs:build');
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

/*
* alias gulp='node_modules/.bin/gulp'
*/
gulp.task('default', ['build', 'webserver', 'watch']);