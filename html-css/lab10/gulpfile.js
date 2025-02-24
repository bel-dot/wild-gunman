// Import required modules
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Paths configuration
const paths = {
  pug: {
    mainSrc: 'src/pug/*.pug',           // Source directory for main Pug files only
    src: 'src/pug/**/*.pug',
    dest: 'webapp',                  // Base destination directory for HTML files
  },
  sass: {
    mainSrc: 'src/sass/*.scss',          // Source directory for Sass files
    src: 'src/sass/**/*.scss',
    dest: 'webapp/styles',                    // Destination directory for CSS files
  }
};

// Task to compile main Pug files (excluding "labs" folder)
function compileMainPug() {
  return gulp.src(paths.pug.mainSrc)
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());        // Reload browser on change
}

// Task to compile Sass files
function compileMainSass() {
  return gulp.src(paths.sass.mainSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream());        // Reload browser on change
}

// Browser-Sync setup
function serve() {
  browserSync.init({
    server: {
      baseDir: './webapp',                // Serve files from the "dist" directory
    },
    notify: false,                      // Disable notification pop-ups in the browser
  });

  gulp.watch(paths.pug.src, compileMainPug);
  gulp.watch(paths.sass.src, compileMainSass);
}

// Define the build and watch tasks
const build = gulp.series(gulp.parallel(compileMainPug, compileMainSass));
const watch = gulp.series(build, serve);

exports.compileMainPug = compileMainPug;
exports.compileMainSass = compileMainSass
exports.build = build;
exports.watch = watch;
exports.default = watch;
