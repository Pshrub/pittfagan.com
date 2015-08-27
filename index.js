import fs from 'fs';
import http from 'http';
import express from 'express';
import exphbs from 'express-handlebars';
import compression from 'compression';
import hash from 'files-hash';
import spdy from 'spdy';
import randomstring from 'randomstring';

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

// cache main script for page inlining
const inline = {
    script: fs.readFileSync(__dirname + '/dist/js/main.js')
}; 

// gzip responses
app.use(compression());

// change default powered by
app.use((req, res, next) => {
    res.set('X-Powered-By', 'Computers');
    next();
});

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
    const nonces = {
        script: randomstring.generate(),
        style: randomstring.generate()
    };
    const policy = `default-src 'none';`
        + `style-src 'nonce-${nonces.style}' 'self';`
        + `img-src 'self' https://www.google-analytics.com;`
        + `script-src 'nonce-${nonces.script}' https://www.google-analytics.com;`
        + `font-src data: 'self';`
        + `connect-src 'self'`;

    res.header('Content-Security-Policy', policy);

    res.render('index', {
        wallpaper: randomItem(wallpapers),
        inline,
        hashes,
        nonces,
        helpers: {
            concat: function(...args) {
                // last arg is options object, so remove from concat
                return args.slice(0, -1).join('');
            }
        }
    });
});

const certPath = process.env.CERT;
const spdyConfig = {
    spdy: {
        // enable ssl if there's a cert supplied, use plain if not
        ssl: !!certPath,
        plain: !certPath
    }
};

if (certPath) {
    spdyConfig.key = fs.readFileSync(certPath + '.key');
    spdyConfig.cert = fs.readFileSync(certPath + '.crt');
};

// Redirect traffic if specificed
// Should be used for redirecting http to https
if (process.env.REDIRECT_URL && process.env.REDIRECT_PORT) {
    const redirectServer = http.createServer((req, res) => {
        res.writeHead(301, { 'Location': `${process.env.REDIRECT_URL}${req.url}` });
        res.end();
    });

    redirectServer.listen(process.env.REDIRECT_PORT, () => {
        const address = redirectServer.address();
        const host = address.address;
        const port = address.port;

        console.log('redirect to %s being served on http://%s:%d', process.env.REDIRECT_URL, host, port);
    });
}

const server = spdy.createServer(spdyConfig, app).listen(process.env.PORT || 8080, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log('davidpadbury.com being served on http://%s:%d', host, port);
});
