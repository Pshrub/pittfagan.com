var fs = require('fs');
var http = require('http');
var express = require('express');
var exphbs = require('express-handlebars');
var compression = require('compression');
var hash = require('files-hash');
var randomstring = require('randomstring');
var useragent = require('useragent');

const wallpapers = fs.readdirSync(__dirname + '/dist/wallpapers');

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const app = express();

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
app.set('views', __dirname + '/dist/views');
// app.set('views', __dirname + '/app/views');
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
    hashes = hash('**/*', { cwd: 'dist' })
    .then((hashes) => {

      res.render('index', {
          wallpaper: randomItem(wallpapers),
          inline: inline,
          hashes: hashes,
          helpers: {
              concat: function() {
                  // last arg is options object, so remove from concat
                  return Array.prototype.slice.call(arguments, 0, -1).join('');
              }
          }
      });
   });
});

var server = http.Server(app);
server.listen(8080);
