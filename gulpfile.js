var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    wrap = require('gulp-wrap');


var paths = {
    scripts: [
        'src/**/*.ts'
    ],
    styles: [
        'src/css/base.scss'
    ],
    dist: 'dist/'
};

gulp.task('clean', function () {
    return gulp.src(['dist/'], {read: false})
        .pipe(clean());
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(rename({basename: 'gh-profile-card'}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report())
        .pipe(ts({
            noImplicitAny: false,
            target: 'ES5'
        }))
        .pipe(concat('gh-profile-card.js'))
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Re-run the task when files are changing
gulp.task('watch', function () {
    gulp.start('styles', 'scripts');
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts');
});