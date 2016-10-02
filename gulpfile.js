var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');

var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var open = require("gulp-open");
var remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");

function inc(importance) {
  return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tag_version({}));
}

gulp.task('bump-patch', function() { return inc('patch'); });
gulp.task('bump-minor', function() { return inc('minor'); });
gulp.task('bump-major', function() { return inc('major'); });



gulp.task("pre-coverage", function () {
  return gulp.src(["dist/**/*.js", "!dist/**/*.spec.js"])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task("build-coverage", ["pre-coverage"], function () {
  return gulp.src("dist/**/*.spec.js", {read: false})
    .pipe(mocha({
      reporter: "dot",
      require: ["source-map-support/register"]
    }))
    .pipe(istanbul.writeReports({
      reporters: [ "json" ],
      reportOpts: {
        json: {dir: "dist/coverage/json", file: "js_coverage.json" }
      }
    }));
});

gulp.task("coverage", ["build-coverage"], function () {
  return gulp.src("dist/coverage/json/js_coverage.json")
    .pipe(remapIstanbul({
      reports: {
        "html": "dist/coverage/html",
        "json": "dist/coverage/coverage.json"
      }
    }));
});

gulp.task("open-coverage", ["coverage"], function () {
  return gulp.src('dist/coverage/html/index.html')
    .pipe(open());
});


gulp.task("test", function () {
  return gulp.src("dist/test/**/*.spec.js", {read: false})
    .pipe(mocha({
      reporter: "spec",
      require: ["source-map-support/register"]
    }));
});
