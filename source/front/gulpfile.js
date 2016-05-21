var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var path = require('path');
var del = require('del');
var sass = require('gulp-sass');
var config = {
    js: './dist/js',
    cssSrc: './src/sass/style.scss'
};
function linkScript(name) {
    return function () {
        return browserify(['./src/js/' + name])
            .bundle()
            //Pass desired output filename to vinyl-source-stream
            .pipe(source(name))
            // Start piping stream to tasks!
            .pipe(gulp.dest(config.js));
    }
}
gulp.task('js:clean', function () {
    del(config.js);
});
gulp.task('js:watch', ['js:require'],function () {
    gulp.watch('./src/js/**/*.js', ['js:require'])
});
gulp.task('js:require', ['js:clean'], function () {
    var fs = require('fs');
    var files = fs.readdirSync('./src/js');
    files = files.filter(function (file) {
        return fs.statSync(path.join(__dirname, './src/js', file)).isFile();
    });
    files.forEach(function (file) {
        linkScript(file)()
    })
});
gulp.task('js:min', ['js:require'], function () {
    gulp.src('./dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.js))
});
gulp.task('css:clean', function () {
    del('./dist/css');
});
gulp.task('css:trans', ['css:clean'], function () {
    return gulp.src(config.cssSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('css:min', ['css:clean'], function () {
    return gulp.src(config.cssSrc)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('css:watch', ['css:trans'], function () {
    gulp.watch('./src/sass/**/*.scss', ['css:trans']);
});

gulp.task('html:clean', function () {
    del('./dist/**/*.html')
});
gulp.task('html', ['html:clean'], function () {
    return gulp.src('./src/view/**/*.html')
        .pipe(gulp.dest('./dist/'))
});
gulp.task('html:watch', ['html'],function () {
    gulp.watch('./src/view/**/*.html', ['html'])
});
gulp.task('dev', ['js:watch', 'css:watch', 'html:watch']);
gulp.task('publish',['js:min','css:min','html']);