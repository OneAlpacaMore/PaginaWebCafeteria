const { src, dest, watch, series, parallel } = require('gulp');

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//PLUMBER
const plumber = require('gulp-plumber');

//IMAGENES
const imagenmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
//Funciones

function css(done) {
    //Compilar CSS
    //1: Identificiar la hoja de estilo a compilar
    //2: Compilarla
    //3: Guardar el .css

    src('src/scss/app.scss') //1
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css')) //2


    done(); //3
}


function imagenes() {
    return src('src/img/**/*')
    .pipe( imagenmin( { optimizationLevel: 3 } ) )
    .pipe( dest('build/img') )
}

function versionWebp() {
    const calidad = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp() )
    .pipe( dest('build/img') );
}

function versionAvif() {
    const calidad = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe( avif( calidad ) )
    .pipe( dest('build/img') );
}
//tomar los cambios en tiempo real en vez de ejecutar el scss en consola
function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

