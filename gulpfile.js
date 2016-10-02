var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');


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
