const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get("/", function (req, res) {
  res.sendFile(path.join(`${__dirname}/pages/index.html`));
});

app.listen(3001);
