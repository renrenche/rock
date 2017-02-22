/**
 * tasks
 * 1. default, deploy: 负责构建 EJS 中的静态资源（如图片），包括：拷贝，压缩，替换版本号
 * 2. cdn: 同步到CDN服务，需要自行配置
 * 3. lint: git pre-commint 代码检查
 */
const gulp = require('gulp');
const config = require('config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const pngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const paths = {
    source_ejs: 'client/**/*.ejs',                // 模板源文件路径
    dist_ejs: 'server/compiled/views',
    source_image: 'client/**/image/**',           // 图片源文件路径
    dist_image: 'public/dist/rock/image/',
    source_rev: 'rev/**/*.json',                  // 部署时，存放图片版本号
    dist_rev: 'rev/image',
    lint_dir: ['./**/*.js', '!client/common/libs/**', '!public/**', '!node_modules/**'],
    public_dir: 'public/dist/rock/**/*',          // 静态资源路径
};

/**
 * Linter
 * run before git-commit
 */
gulp.task('lint', function () {
    return gulp.src(paths.lint_dir)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('lint-fix', function () {
    return gulp.src(paths.lint_dir)
        .pipe($.eslint({
            fix: true,
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('image.copy', function () {
    return gulp.src([paths.source_image])
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist_image))
    .pipe($.livereload());
});

gulp.task('watch', function () {
    $.livereload.listen();
    gulp.watch(paths.source_image, function (e) {
        console.log(`File ${e.path} is ${e.type}, running tasks...`);
        runSequence('image.copy');
    });
});

/* Development
 * 几乎所有的编译工作都通过webpack实现，只有模板文件中引用的静态文件地址，是使用gulp来拷贝到目标文件中的
 * 顺序：image.copy
 * 顺序：watch
 */
gulp.task('default', function () {
    runSequence(
        'image.copy',
        'watch'
    );
});

/**
 * 图片处理：压缩，拷贝，打版本号
 */
gulp.task('image.minify', function () {
    return gulp.src([paths.source_image])
        .pipe($.flatten())
        .pipe($.imagemin([
            pngquant({ quality: '65-65' }),
            imageminMozjpeg({ quality: 60 }),
            $.imagemin.gifsicle(),
            $.imagemin.svgo()
        ]))
        .pipe($.rev())
        .pipe(gulp.dest(paths.dist_image))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(paths.dist_rev));
});

/**
 * 替换模板中引用图片的路径
 */
const patterns = {
    image: /\/dist\/rock\/(image\/[\w-/$\{}.=\u2E80-\u9FFF~]*\.(png|jpg|jpeg|gif|ico|svg|eot|woff|ttf|swf|mp4))/g, // eslint-disable-line
};
const replacements = {
    image: `${config.cdn.domain}${config.cdn.prefix}$1`,
};
gulp.task('templates.replace', function () {
    return gulp.src([paths.source_rev, paths.source_ejs])
        .pipe($.revCollector({ replaceReved: true }))
        .pipe($.replace(patterns.image, replacements.image))
        .pipe(gulp.dest(paths.dist_ejs));
});

/**
 * Deploy
 * 构建静态资源、打版本号、替换引用
 * 顺序：image.minify(copied)
 * 顺序：template.replaced(replaced -> copy)
 */

gulp.task('deploy', function () {
    runSequence(
        'image.minify',
        'templates.replace'
    );
});

/**
 * 上传到CDN
 * Notice: 这里需要自行配置
 */
gulp.task('cdn', function () {
    return gulp.src([paths.public_dir])
        .pipe($.qiniu({
            accessKey: config.cdn.qiniu.accessKey,
            secretKey: config.cdn.qiniu.secretKey,
            bucket: config.cdn.qiniu.bucket,
            private: config.cdn.qiniu.private,
        }, { dir: config.cdn.prefix }));
});
