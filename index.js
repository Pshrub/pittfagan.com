var express = require('express');
var app = express();

app.use(express.static('public', {
    index: false
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(process.env.PORT || 8080, function() {
    var address = server.address();
    var host = address.address;
    var port = address.port;

    console.log('davidpadbury.com being served on http://%s:%d', host, port);
});
