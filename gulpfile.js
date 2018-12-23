var gulp = require('gulp');
var rev = require('gulp-rev'); //给每个文件计算出一个哈希码 修改文件名以区别版本
var revReplace = require('gulp-rev-replace');//更新文件的引用 例如index.html引用js
var useref = require('gulp-useref'); //自动合并文件 例如把几个js文件合并在一起
var filter = require('gulp-filter');
var uglify = require('gulp-uglify'); //压缩js的插件
var csso = require('gulp-csso');  //压缩css的插件

gulp.task('default',function(){
    var jsFilter = filter('*/*.js',{restore:true});
    var cssFilter = filter('*/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
