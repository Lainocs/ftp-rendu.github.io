const { src, dest, watch, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("*.html").on('change', browserSync.reload);
}

function sass(){
    return src('./sass/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

function watcher(done){
    watch('./sass/', sass)
    done();
}


module.exports = {
    sass,
    watcher,
    browser: parallel(browser, watcher)
}