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
        .pipe(gp.sass({}))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions']
        }))
        .on("error", gp.notify.onError({
        message: "Error: <%= error.message %>",
        title: "stile"
      	}))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe (gulp.dest('build/static/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('img', function(){
    return gulp.src('src/staic/img/**/*.*')
    .pipe (gulp.dest('build/static/img/'));
});

gulp.task('watch', function(){
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('src/static/img/**/*.*', gulp.series('img'));
});
gulp.task('default', gulp.series(
	gulp.parallel('pug', 'sass', 'img'),
    gulp.parallel('watch', 'serve')
	));