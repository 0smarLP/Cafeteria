const { src, dest, watch, series, parallel } = require("gulp");

//DEPENDENCIAS DE CSS Y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

//DEPENDENCIAS DE IMAGENES
const gulpSquoosh = require("gulp-squoosh");

//TAREAS
function css(done) {
  //compilar SASS
  //Identificar Archivo
  src("src/scss/app.scss")
    //Compilar
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    //GUARDAR
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

// Reducir peso de las imagenes
function imagenes(done) {
  src("src/img/**/*.{png,jpg}").pipe(gulpSquoosh()).pipe(dest("build/img"));
  done();
}

// Convertir a Webp y Avif
function imagenesFormato() {
  return src("src/img/**/*.{png,jpg}")
    .pipe(gulpSquoosh())
    .pipe(dest("build/img"));
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);

  done();
}

//Series - Se inicia una tarea y hasta que finaliza, inicia la siguiente
//parallel - Todas inician al mismo tiempo

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imagenesFormato = imagenesFormato;
exports.default = series(imagenes, css, dev);
