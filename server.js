const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get('/', function (req, res) {
    res.sendFile(path.join(`${__dirname}/pages/home.html`));
});

// app.post('/send-email', function (req, res) {
//     console.log(JSON.stringify({
//         req,
//         res
//     }))
// });

app.post('/send-email', function (req, res) {
    console.log("here")
});

app.listen(3001);