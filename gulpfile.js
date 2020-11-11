const {src, dest, watch, series} = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer');

function bs() {
  serveSass();
  serveCss();
  html();
  script();
  // js();
  browserSync.init({server: {baseDir: "src/"}});
  watch('src/sass/**/*.+(sass|scss)', serveSass);
  watch('src/*.html').on('change', browserSync.reload);
  watch('src/js/*.js').on('change', browserSync.reload);
}    

function serveSass() {
  return src('src/sass/**/*.+(sass|scss)')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

function serveCss() {
  return src([
    'node_modules/normalize.css/normalize.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(dest('src/sass'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/*.html')
  .pipe(browserSync.stream());
}

function script() {
  return src('src/js/*.js')
  .pipe(browserSync.stream());
}

// function js() {
//   return src([
//     'node_modules/slick-carousel/slick/slick.js'
//     ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(dest('src/js'))
//     .pipe(browserSync.stream());
// }

function clean(done) {
  del.sync('dist');
  done();
}

function exportFiles(done) {
  src('src/**/*.html').pipe(dest('dist'));
  src('src/css/**/*.css').pipe(dest('dist/css'));
  src('src/js/**/*.js').pipe(dest('dist/js'));    
  src('src/fonts/**/*.*').pipe(dest('dist/fonts'));
  src('src/images/**/*.*').pipe(dest('dist/images')); 
  done();  
}

exports.serve = bs;
exports.build = series(clean, exportFiles);