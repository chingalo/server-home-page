const express = require("express");
const app = express();
const path = require("path");
const mail = require("nodemailer").mail;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get('/', function (req, res) {
    res.sendFile(path.join(`${__dirname}/pages/home.html`));
});
app.post('/send-email', function (req, res) {
    const {
        subject,
        _replyto,
        name,
        message
    } = req.body;
    mail({
        from: `${name} ✔ <${_replyto}>`,
        to: `profschingalo@gmail.com, jchingalo@hisptanzania.org`,
        subject: `${subject}✔`,
        text: `${message}`,
        html: `${message}`
    });
    res.redirect('/');
});

app.listen(3001);