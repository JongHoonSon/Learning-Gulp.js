import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import gimage from "gulp-image";

const gsass = require("gulp-sass")(require("node-sass"));

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const img = () =>
  gulp.src(routes.img.src).pipe(gimage()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gsass().on("error", gsass.logError))
    .pipe(gulp.dest(routes.scss.dest));

const clean = () => del(["build"]);

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.src, styles);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]);

const post = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, post]);
