import fs from 'fs';
import express from 'express';
import exphbs from 'express-handlebars';
import compression from 'compression';
import hash from 'files-hash';

const wallpapers = fs.readdirSync(__dirname + '/dist/wallpapers');

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const app = express();
let hashes = {};

// hash content of dist directory
// used for cache busting paths
(async function() { 
    hashes = await hash('**/*', { cwd: 'dist' });
})();

// gzip responses
app.use(compression());

// Setup view engine
app.engine('.html', exphbs({
    extname: '.html'
}));
app.set('views', __dirname + '/app/views');
app.set('view engine', '.html');

// Serve static directories
['dist', 'public'].forEach(dir => {
    app.use(express.static(dir, {
        index: false,
        // cache for super long time, assume hash busting urls in use
        maxAge: '1 year',
        // don't need etags due to cache busting urls
        etag: false,
        lastModified: false
    }));
});

app.get('/', function(req, res) {
    res.render('index', {
        wallpaper: randomItem(wallpapers),
        hashes,
        helpers: {
            concat: function(...args) {
                // last arg is options object, so remove from concat
                return args.slice(0, -1).join('');
            }
        }
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log('davidpadbury.com being served on http://%s:%d', host, port);
});
