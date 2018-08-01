const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    sass = require('gulp-sass')

const { APPS } = require('../config')
const modifyCustomCssUrlPath = require('./utils/custom_css_url_path')


function buildCustom() {
    let tasks = []
    for (let app of APPS) {
        tasks.push(getBuildCustomCssPromise(app))
        tasks.push(getBuildCustomJsPromise(app))
    }
    return Promise.all(tasks)
}

function getBuildCustomCssPromise(app) {
    return new Promise(function(resolve) {
        gulp.src(`apps/${app}/static/${app}/css/**/*.scss`)
            .pipe(sass())
            .pipe(concat('custom.min.css'))
            .pipe(modifyCustomCssUrlPath(app))
            .pipe(uglifycss())
            .pipe(gulp.dest(`static/.tmp/${app}`))
            .on('end', resolve)
    })
}

function getBuildCustomJsPromise(app) {
    return new Promise(function(resolve) {
        gulp.src(`apps/${app}/static/${app}/js/**/*.js`)
            .pipe(concat('custom.min.js'))
            .pipe(uglifyjs())
            .pipe(gulp.dest(`static/.tmp/${app}`))
            .on('end', resolve)
    })
}


module.exports =  {
    buildCustom
}