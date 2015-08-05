import gulp from 'gulp';
import del from 'del';
import imagemin from 'gulp-imagemin';
import jpegRecompress from 'imagemin-jpeg-recompress';

gulp.task('clean', (callback) => {
    del('dist', callback);
});

gulp.task('optimize-wallpapers', () => {
    return gulp.src('wallpapers/*.jpg')
        .pipe(imagemin({
            use: [jpegRecompress({
            })]
        }))
        .pipe(gulp.dest('dist/wallpapers'));
});

gulp.task('build', [ 'optimize-wallpapers' ]);
