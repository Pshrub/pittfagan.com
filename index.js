const express = require('express');
const app = express();

app.use(express.static('public', {
    index: false
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const server = app.listen(process.env.PORT || 8080, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log('davidpadbury.com being served on http://%s:%d', host, port);
});
