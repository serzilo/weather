'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	rigger = require('gulp-rigger'),
	prefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
	jshint = require('gulp-jshint'),
    spritesmith = require('gulp.spritesmith'),
	browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 	   'build/',
        css: 	   'build/css/',
        js:  	   'build/js/',
        images:    'build/images/'
    },
    src: {
        html:    'src/html/index.html',
        css:     'src/css/main.less',
        js: 	 'src/js/**/*.js',
        js_libs_path: 'src/js/libs/',
        js_libs_list: 'jquery.js,underscore.js,backbone.js,backbone.localStorage.js',
        sprite:  'src/images/sprite/*.*',
        static:  'src/images/static/*.*'
    },
    watch: {
        html:    'src/html/**/*.html',
        css:     'src/css/*.less',
        js: 	 'src/js/**/*.js',
        js_libs: 'src/js/libs/*.js',
        sprite:  'src/images/sprite/*.*',
        static:  'src/images/static/*.*'
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
    // copy Require.js
    gulp.src([path.src.js_libs_path + 'require.js'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))

    // libs concatination
    console.log('Required libs:');
    var libsArray = path.src.js_libs_list.split(','),
        libsArrayFixed = libsArray.map(function(item, num) {
            console.log((num+1) + '. ' + path.src.js_libs_path + item)
            return path.src.js_libs_path + item;
        });

    gulp.src(libsArrayFixed)
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(size())
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src([path.src.js, '!' + path.src.js_libs_path + '*.js'])
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

gulp.task('static:build', function () {
    gulp.src(path.src.static)
        .pipe(gulp.dest(path.build.images));
}); 


gulp.task('build', [
	'html:build',
    'sprite:build',
    'static:build',
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

    watch([path.watch.static], function(event, cb) {
        gulp.start('static:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

/*
* alias gulp='node_modules/.bin/gulp'
*/
gulp.task('default', ['build', 'webserver', 'watch']);