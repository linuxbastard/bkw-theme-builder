var themename = 'misterfixit2021';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    path = require('path'),
    postcss = require('gulp-postcss'),
    sourcemaps = require ('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    wpRoot =path.join(__dirname, '../../../'),
    themeDir = path.join(__dirname, '..', themename),
    sassDir = path.join(themeDir, 'sass/'),
    jsDir = path.join(themeDir + 'js/'),
    imgDir = path.join(themeDir + 'images/'),
    langDir = path.join(themeDir + 'languages/');

gulp.task('css', function(){
    return gulp.src(sassDir + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(postcss([
            autoprefixer({overrideBrowserslist: ['last 1 version']})
        ]))
        .pipe(sourcemaps.write('../' + themename))
        .pipe(gulp.dest(themeDir));
});

gulp.task('watch', function(){
    browserSync.init({
        ui: false,
        proxy: 'localhost/wordpress'
    })
    gulp.watch(sassDir + '**/*.scss', gulp.series(['css']));
    gulp.watch(themeDir + '**/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series['watch']);