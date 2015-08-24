import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import del from 'del';
import imagemin from 'gulp-imagemin';
import jpegRecompress from 'imagemin-jpeg-recompress';
import rp from 'request-promise';
import request from 'request';
import unzip from 'unzip';
import mkdirp from 'mkdirp-promise';
import minifyCss from 'gulp-minify-css';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';

gulp.task('clean', (callback) => {
    del('dist', { force: true }, callback);
});

gulp.task('fetch-fonticons', async function() {
    // get a session-id for this config
    const sessionId = await rp.post({
        url: 'http://fontello.com',
        formData: {
            config: fs.createReadStream(__dirname + '/app/fonts/config.json')
        }
    });

    // ensure we have dirs to place unzipped content
    await Promise.all([ mkdirp(__dirname + '/dist/css'), mkdirp(__dirname + '/dist/font') ]);

    // download zip archive and extract required files
    return new Promise((resolve, reject) => {
        request(`http://fontello.com/${sessionId}/get`)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                // get extension without period
                const ext = path.extname(entry.path).slice(1);
                const filename = path.basename(entry.path);
                const use = ['eot', 'svg'].includes(ext)  // only need eot and svg fonts, woff and ttf are embedded
                    || filename === 'fonticons-embedded.css'; // only need the embedded version of the css

                if (use) {
                    const destPath = ext === 'css' ? 'css/fonticons.css' : `font/${filename}`;
                    const destFullPath = `${__dirname}/dist/${destPath}`;

                    entry.pipe(fs.createWriteStream(destFullPath));
                } else {
                    // ignore
                    entry.autodrain();
                }
            })
            .on('close', resolve)
            .on('error', reject);
    });
});

gulp.task('minify-css', [ 'fetch-fonticons' ], () => {
    return gulp.src([ 'app/css/**/*.css', 'dist/css/fonticons.css' ])
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: [ 'last 4 versions' ]
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', () => {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('optimize-wallpapers', () => {
    return gulp.src('wallpapers/*.jpg')
        .pipe(imagemin({
            use: [jpegRecompress({
                quality: 'low',
                progressive: false
            })]
        }))
        .pipe(gulp.dest('dist/wallpapers'));
});

gulp.task('build', [ 'optimize-wallpapers', 'fetch-fonticons', 'minify-css', 'minify-js' ]);
