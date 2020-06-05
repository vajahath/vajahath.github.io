const gulp = require("gulp");
const htmlMin = require("gulp-htmlmin");
// const del = require("del");
const path = require("path");

const dest = path.join(__dirname, "dist");

function cleanDist() {
  // return del(dest);
}

function minifyHtml() {
  // minify
  // const htmlSrc = src.map((el) => path.join(__dirname, el, "index.html"));
  const htmlSrc = ["**/*.html", "!dist/**", "!node_modules/**"];
  return gulp
    .src(htmlSrc)
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        collapseInlineTagWhitespace: true,
      })
    )
    .pipe(gulp.dest(dest));
}

function copyEverythingExceptHTML() {
  return gulp
    .src([
      "**/*",
      "!**/*.html",
      "!dist/**",
      "!node_modules/**",
      "!*.js",
      "!.gitignore",
      "!*.json",
      "!*.md",
      "!*.lock",
    ])
    .pipe(gulp.dest(dest));
}

exports.default = gulp.series(cleanDist, minifyHtml, copyEverythingExceptHTML);
