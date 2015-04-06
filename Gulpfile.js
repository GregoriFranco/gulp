    //plugins
    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var jshint = require('gulp-jshint');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
     
    var jsFiles = "./public/src/main.js";
    var sassFile = "./public/src/style.scss"; 
    
    gulp.task('lint', function() {
        gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });
     
     // Sass
    gulp.task('sass', function() {
        return gulp.src(sassFile)
            .pipe(sass())
            .pipe(gulp.dest('./public/dist/css'));
    });
    
    gulp.task('dist', function() {
        gulp.src(jsFiles)
        .pipe(concat('./public/dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js'));
    });

    gulp.task('default', function() {
        gulp.run('lint', 'dist', 'sass');
    });

    gulp.task('watch', function() {
        gulp.watch(jsFiles, function(evt) {
            gulp.run('lint', 'dist');
        });
    }); 