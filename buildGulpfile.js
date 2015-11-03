/* 
 * 基本 gulp 處理流程
 * Daniel Teng
 * 
 */
/* 基本目錄結構
 * [build]        最終版本，目錄底下存放 *.html
 *  - [css]       存放 all.css
 *  - [js]        存放最終用到的 js 檔
 * [css]          存放 scss 轉 css 中間產物
 * [js]
 *  - [minify]    最小化後的版本
 *  - [original]  原始版本，從此處編輯 javascript
 * [scss]         原始版本，從此處編輯 scss
 * index.html     結果顯示頁面
 * gulpfile.js    流程控制程式
 * package.json   套件相依設定
 */
var gulp       = require('gulp'),            // 載入 gulp
    Concat     = require('gulp-concat'),     // 載入 合併工具
    Minifycss  = require('gulp-minify-css'), // css minify
    Uglify     = require('gulp-uglify'),     // 載入 gulp-uglify
    Rename     = require('gulp-rename'),     // 更改檔名
    Sass       = require('gulp-sass'),       // 載入 gulp-sass
    Plumber    = require('gulp-plumber'),    // 載入 例外處理工具 
    Livereload = require('gulp-livereload'), // Livereload
    Notify     = require('gulp-notify'),     // 工作完成後提醒
    BrowserSync= require('browser-sync');    // WebServer 與測試環境
// 啟動 Web服務
gulp.task('WebServer', ['styles'], function(){
  BrowserSync.init({
   server: "./"                                                       
  });
});
// 監控任務
gulp.task('watch', function () {
  Livereload.listen();  // 自動重刷頁面
  gulp.watch('*.html').on('change', BrowserSync.reload);
  gulp.watch('js/original/*.js', ['scripts']);
  gulp.watch('scss/**/*.scss', ['styles']);
});
/* 
 * 處理 JavaScript
 * 1) Uglify
 * 2) 改檔名
 * 3) 存到 build/js/
 */
gulp.task('scripts', function () {
  gulp.src('js/original/*.js')                  // 指定要處理的原始檔案目錄
    .pipe(Plumber())
    .pipe(Uglify())                             // 將 JavaScript 做最小化
    .pipe(Rename(function(path){
      path.basename += ".min";
      path.extname = ".js";
     }))
    .pipe(gulp.dest('build/js/'))               // 指定最小化後的目錄
    .pipe(Livereload())
    .pipe(Notify());
});
/*
 * 處理 CSS
 * 1) scss --> css
 * 2) concat css --> all.css
 * 3) css 最小化 --> all.min.css
 */
gulp.task('styles', function () {
  gulp.src('scss/**/*.scss')                    // 指定要處理的 Scss檔案目錄
    .pipe(Plumber())
    .pipe(Sass({                                // 編譯 Scss
          outputStyle: 'compressed'}))
    .pipe(gulp.dest('css'))                     // 指定編譯後的 css 檔案目錄
    .pipe(Livereload())
    .pipe(Notify());
});
// 整併檔案
gulp.task('concat', function(){
  gulp.src('./css/*.css')
    .pipe(Plumber())
    .pipe(Concat('all.css'))
    .pipe(gulp.dest('build/css/'))              // 整併後放入 build/css/all.css
    .pipe(Livereload())
    .pipe(Notify());
});
// css 最小化
gulp.task('minify-css', ['concat'], function(){
  gulp.src('build/css/all.css')
    .pipe(Plumber())
    .pipe(Minifycss({
      keepBreaks: true
    }))
    .pipe(Rename(function(path){
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(Livereload())
    .pipe(Notify());
});
gulp.task('default', ['WebServer','scripts', 'styles', 'minify-css', 'watch']);
