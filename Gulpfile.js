    //plugins
    var gulp = require('gulp');
    var minifycss = require('gulp-minify-css');
    var sass = require('gulp-sass');
    var jshint = require('gulp-jshint');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
     
    var jsFile = "./public/src/main.js";
    var cssFile = "./public/src/style.scss"; 
     
    gulp.task('style', function() {
        return gulp.src(cssFile)
            .pipe(sass({ style: 'expanded' }))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./public/dist/css'));
    });
    
    gulp.task('script', function() {
        gulp.src(jsFile)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('./public/dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js'));
    });

    gulp.task('default', function() {
        gulp.run('style', 'script');
    });

    gulp.task('watch', function() {
        gulp.watch(cssFile, function(evt) {
            gulp.run('style');
        });

        gulp.watch(jsFile, function(evt) {
            gulp.run('script');
        });
    }); 