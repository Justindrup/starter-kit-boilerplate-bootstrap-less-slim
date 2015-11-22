var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

// Development web server
// Servidor local y livereload
/*gulp.task('server', function() {
  connect.server({
    root: './',
    hostname: '127.0.0.1',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});*/


// Compilar livreload
var   livereload = require('gulp-livereload');
livereload({ start: true })


// Compilar less
var less = require('gulp-less');
var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('./src/less/main.less')

    .pipe(less({
     /* paths: [ path.join(__dirname, 'less', 'includes') ]*/
      paths: [
        '.',
        './node_modules/bootstrap-less'
    ]
    }))
    .pipe(gulp.dest('./src/compiled'));
});



//autoprefixer

var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('autoprefixer', function () {
    return gulp.src('src/compiled/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());;
});






//slim

var slim = require("gulp-slim");
 
gulp.task('slim', function(){
  gulp.src("./src/slim/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});


//jshint

var jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish');

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./dist/js/main.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// live reload 
gulp.task('html', function() {
  gulp.src('./dist/**/*.html')
    .pipe(connect.reload());
});




//watch
gulp.task('watch', function() {
  gulp.watch(['./dist/**/*.html'], ['html']);
  gulp.watch(['./src/**/*.less'], ['less']);
  gulp.watch(['./src/compiled/*.css'], ['autoprefixer']);
  gulp.watch(['./dist/**/*.js'], ['jshint']);
  gulp.watch(['./src/slim/*.slim'], ['slim']);
});





gulp.task('default', ['watch']);

