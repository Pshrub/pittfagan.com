import fs from 'fs';
import express from 'express';
import exphbs from 'express-handlebars';
import compression from 'compression';

const wallpapers = fs.readdirSync(__dirname + '/dist/wallpapers');

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const app = express();

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
        index: false
    }));
});

app.get('/', function(req, res) {
    res.render('index', {
        wallpaper: randomItem(wallpapers)
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log('davidpadbury.com being served on http://%s:%d', host, port);
});
