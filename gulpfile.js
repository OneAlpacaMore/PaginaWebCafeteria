const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');


function css ( done ) {
    //Compilar CSS
    //1: Identificiar la hoja de estilo a compilar
    //2: Compilarla
    //3: Guardar el .css

    src('src/scss/app.scss')
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )

    
    done();
}

//tomar los cambios en tiempo real en vez de ejecutar el scss en consola
function dev() {
    watch( 'src/scss/**/*.scss', css );
}

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);

