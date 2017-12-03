'use strict'
var gulp = require('gulp'),
	gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('pug', function () {
    return gulp.src('src/pug/page/*.pug')
        .pipe(gp.pug({
            pretty:true
        }))
        .pipe (gulp.dest('build'))
        .on('end', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('src/static/sass/main.sass')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass().on("error", gp.notify.onError({
            title: "stile",
            message: "Error: <%= error.message %>"
              })))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions']
        }))
        
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe (gulp.dest('build/static/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('img', function(){
    return gulp.src('src/static/img/**/*.{png,jpg,gif}')
    .pipe (gulp.dest('build/static/img/'));
});
gulp.task('scripts', function(){
    return gulp.src('src/static/js/main.js')
    .pipe (gulp.dest('build/static/js/'));
});

gulp.task('watch', function(){
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('src/static/img/**/*.png', gulp.series('img'));
    gulp.watch('src/static/js/main.js', gulp.series('scripts'));
});
gulp.task('default', gulp.series(
	gulp.parallel('pug', 'sass', 'img', 'scripts'),
    gulp.parallel('watch', 'serve')
	));