const gulp = require("gulp");
const htmlMin = require("gulp-html-minifier-terser");
const del = require("del");
const path = require("path");

const dest = path.join(__dirname, "..");

async function cleandocs() {
  return del(
    [
      "../aisha",
      "../experements",
      "../merry-christmas-ajesh",
      "../merry-christmas-amal",
      "../index.html",
    ],
    { force: true }
  );
}

function minifyHtml() {
  // minify
  // const htmlSrc = src.map((el) => path.join(__dirname, el, "index.html"));
  const htmlSrc = ["**/*.html", "!docs/**", "!node_modules/**"];
  return gulp
    .src(htmlSrc)
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(gulp.dest(dest));
}

function copyEverythingExceptHTML() {
  return gulp
    .src([
      "**/*",
      "!**/*.html",
      "!docs/**",
      "!node_modules/**",
      "!*.js",
      "!.gitignore",
      "!*.json",
      "!*.md",
      "!*.lock",
    ])
    .pipe(gulp.dest(dest));
}

exports.default = gulp.series(cleandocs, minifyHtml, copyEverythingExceptHTML);
