const express = require("express");
const app = express();
const path = require("path");

//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get('/', function (req, res) {
    res.sendFile(path.join(`${__dirname}/pages/home.html`));
});

app.listen(3001);