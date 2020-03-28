const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const _ = require('lodash')
const appConfig = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get('/', function(req, res) {
    res.sendFile(path.join(`${__dirname}/pages/index.html`));
});
app.post('/send-email', function(req, res) {
    const {
        subject,
        _replyto,
        name,
        message
    } = req.body;
    try {
        const emailConfig = appConfig.emailConfig || {}
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailConfig.username || "",
                pass: emailConfig.password || ""
            }
        });
        const mailOptions = {
            from: `${name} ✔ <${_replyto}>`,
            to: _.join(appConfig.users || [], ","),
            subject: `${subject}`,
            text: `${message}`
        }
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(JSON.stringify({ error }));
            } else {
                console.log(JSON.stringify({ info }));
            }
        })
    } catch (error) {
        console.log({ error })
    }
    res.redirect('/');
});

app.listen(3001);